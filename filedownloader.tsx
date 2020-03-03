const fs = require('fs')

const mediaData = {
    fileName: "fname.png",
    height: 821,
    mimeType: "image/png",
    size: 71766,
    url: "some remote url",
    width: 1080
  }

export class DownloadAndSaveMedia {

    private static arrayBufferToBase64 = ( buffer:any ) => {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    /**
     * 
     * @param mediaFile 
     */
    public static async downloadMedia() {
        try{
            const { fileName, mimeType : type, size, url } = mediaData
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            let that = this
            xhr.onload =  async function(e) {
              if (this.status == 200) {
                var imgBuffer = this.response;
                var imgBase64 =  that.arrayBufferToBase64(imgBuffer)
                const localUrl = fileName
                fs.writeFile(localUrl, imgBase64, 'base64', (err:any, res:any) => {
                    if(err){
                        console.log("media download failed")
                    }
                    console.log('file saved')
                })
              }
            };
            xhr.send();
        }catch(e){
            console.log('storing media failed... ',e)
        }
        
    }
}