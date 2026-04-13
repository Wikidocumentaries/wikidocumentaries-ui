<!-- 
 This component will show during the image upload process, indicating the upload process.
  -->
<template>
    <div class="wait-page">
      <div class="wait">
        <div class="lds-heart">
          <div></div>
        </div>
        <div class="message">{{ $t('upload.popup.uploadInProgress') }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "InUpload",
  };
  </script>
  
  <style scoped>
  .wait {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  
  .message {
      padding-left: 20px;
  }
  .bars {
    flex: 1 0 100%;
    height: 18px;
    display: flex;
    flex-wrap: nowrap;
  }
  </style>
  
  