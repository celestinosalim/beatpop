class Music {
  constructor(filePath){
    this.filePath = filePath;
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.source = null;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
  }




    show(){
      this.analyser.getByteFrequencyData(this.frequencyData);
      return this.frequencyData;
    }

    playSong(filename){
      let bufferLoader = new BufferLoader(this.audioContext, [`./${filename}`], (bufferArr)=>{
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = bufferArr[0];
        this.source.connect(this.analyser);
        this.source.connect(this.audioContext.destination);
        this.source.start(0);
      });
      bufferLoader.load();
    }
}
