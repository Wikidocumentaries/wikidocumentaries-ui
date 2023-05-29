// PKCE code Copyright (c) 2019 Aaron Parecki
// MIT Public License
// https://github.com/aaronpk/pkce-vanilla-js

/*global $ Handlebars */

// Particular to this app. Change if you fork!
const getRandomValues = require('get-random-values')
const sha256 = require('crypto-js/sha256');
const crypto = require('crypto');

module.exports = {
    ajax,
    startLogin,
}

const server = 'https://apiclient.wiki/'
const clientID = "6ac53a07b581e30e47664cd9e8f3d0e4"

// OAuth routes

const authroot = `https://meta.wikimedia.org/w/rest.php`
const authorize = `${authroot}/oauth2/authorize`
const token = `${authroot}/oauth2/access_token`
const profileurl = `${authroot}/oauth2/resource/profile`

console.log(10086);

// API root

const root = 'https://api.wikimedia.org/core/v1/wikipedia/en/'
const feeds = 'https://api.wikimedia.org/feed/v1/wikipedia/en/'

function ajax(args) {
    ensureToken(function(token) {
        if (token) {
          args.headers = (args.headers) ? args.headers : {}
          args.headers['Authorization'] = `Bearer ${token}`
        }
        if (!args.error) {
          args.error = function(jqXHR, textStatus, errorThrown) {
              showError(`Error calling ${args.url}: ${errorThrown}`)
          }
        }
        $.ajax(args)
      })
}

const ensureToken = function(callback) {
  let results = getLoginResults()
  // Are we past the expiry date?
  if (Date.now() > results.access_token_expired_ms) {
    let pkce = loadPKCE()
    let data = {
      grant_type: "refresh_token",
      refresh_token: results.refresh_token,
      redirect_uri: `${server}callback`,
      client_id: clientID,
      code_verifier: pkce.codeVerifier
    }
    // We don't want to use access_token for this
    $.post({
      url: token,
      dataType: "json",
      data: data,
      success: function(newResults) {
        saveLoginResults(newResults)
        callback(newResults.access_token)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showError(`Error getting OAuth 2.0 refresh token: ${errorThrown}`)
      }
    })
  } else {
    callback(results.access_token)
  }
}

var timer = null

// from https://stackoverflow.com/questions/1267283/how-can-i-pad-a-value-with-leading-zeros

const lp = function(number, width) {
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function startLogin() {
  let pkce = makePKCE()
  savePKCE(pkce)
  let params = {
    client_id: clientID,
    response_type: "code",
    redirect_uri: `${server}callback`,
    state: getPath(),
    code_challenge: pkce.codeChallenge,
    code_challenge_method: "S256"
  }
  let str = $.param(params)
  let url = `${authorize}?${str}`
  window.location = url
  return false
}

const endLogin = function() {
  let query = (new URL(document.location)).searchParams
  let state = query.get('state')
  let error = query.get('error')
  if (error) {
    let errorDescription = query.get('error_description')
    let message = query.get('message')
    showError((message) ? message : ((errorDescription) ? errorDescription : error))
    if (state) {
      routeTo(state)
    } else {
      routeTo('/')
    }
    return
  }
 let code = query.get('code')
  let pkce = loadPKCE()
  let data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: `${server}callback`,
    client_id: clientID,
    code_verifier: pkce.codeVerifier
  }
  // We don't want to use a token for this
  $.post({
    url: token,
    dataType: "json",
    data: data,
    success: function(results) {
      saveLoginResults(results)
      getProfile(function(profile) {
        if (profile) {
          saveProfile(profile)
        }
        resetNavbar()
        routeTo(state)
      })
    },
    error: function(xhr, status, text) {
      showError(`Error finishing authorization: ${text}`)
    }
  })
}

const saveLoginResults = function(results) {
  // TODO: save other important data
  localStorage.setItem('access_token', results.access_token)
  localStorage.setItem('refresh_token', results.refresh_token)
  localStorage.setItem('access_token_expired_ms', (Date.now() + results.expires_in  * 1000.0).toString())
}

const clearLoginResults = function() {
  // TODO: save other important data
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('access_token_expired_ms')
}

const getLoginResults = function() {
  return {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    access_token_expired_ms: parseFloat(localStorage.getItem('access_token_expired_ms'))
  }
}

const isLoggedIn = function() {
  return getAccessToken()
}

const getAccessToken = function() {
  return localStorage.getItem('access_token')
}

const getProfile = function(callback) {
  ajax({
    url: profileurl,
    success: function(profile) {
      // workaround: this endpoint sometimes returns text/html instead of application/json
      if (typeof(profile) == "string") {
        profile = JSON.parse(profile)
      }
      callback(profile)
    },
    error: function() {
      // Just continue
      callback(null)
    }
  })
}

const loadProfile = function() {
  let profile = {
    username: localStorage.getItem('username')
  }
  return profile
}

const saveProfile = function(profile) {
  localStorage.setItem('username', profile.username)
}

const clearProfile = function() {
  localStorage.removeItem('username')
}

const getQuery = function() {
  return (new URL(document.location)).searchParams
}

const makePKCE = function() {
  let pkce = {
    state: generateRandomString(),
    codeVerifier: generateRandomString()
  }
  pkce.codeChallenge = pkceChallengeFromVerifier(pkce.codeVerifier)
  return pkce
}

const savePKCE = function(pkce) {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  localStorage.setItem("pkce_state", pkce.state)
  localStorage.setItem("pkce_code_verifier", pkce.codeVerifier)
}

const loadPKCE = function() {
  let pkce = {
    state: localStorage.getItem("pkce_state"),
    codeVerifier: localStorage.getItem("pkce_code_verifier")
  }
  pkce.codeChallenge = pkceChallengeFromVerifier(pkce.codeVerifier)
  return pkce
}

const clearPKCE = function() {
  localStorage.removeItem("pkce_state")
  localStorage.removeItem("pkce_code_verifier")
}

/* global Uint32Array */
// changed to Unit8Array due to some errors. Do we need to fix it?

const generateRandomString = function() {
  var array = new Uint8Array(28)
  getRandomValues(array)
//   console.log(getRandomValues(array))
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('')
}

// Base64-urlencodes the input string
function base64urlencode(str) {
    return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/* global sha256 */

function pkceChallengeFromVerifier(v) {
    let hash = crypto.createHash('sha256')
    // let hash = sha256.create()
    hash.update(v)
    // let hashed = hash.array()
    let stringed = String.fromCharCode.apply(null, hash)
    let challenge = base64urlencode(stringed)
    return challenge
}

const logout = function () {
  clearLoginResults()
  clearProfile()
  clearPKCE()
}

