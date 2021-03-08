
<template>
  <div class="wrapper">
    <div style="border-right:3px solid white;"  @click="handleClick">
        <img :src="pic[index]">
        <span>语音连接</span>
    </div>
  </div>
</template>
 
<script>
import { MediaStreamRecorder } from '@/store/MediaStreamRecorder.js'
export default {
  name: 'MRecorder',
  props: {
    timelimit: {
      default: 60, // 默认为1min
      type: Number
    },
    pushurl: {
      default: '', // 上传到服务器的路径
      type: String
    }
  },
  data() {
    return {
      mcounter: 0, // 累积时间
      recording: false, // 标记是否在录音
      intervaltimerid: '', // 间隔时间定时器编号
      tiptext: '点击录音', // 提示文字
      mediaRecorder: null, // 录音笔
      mediaConstraints: {
        audio: true
      },
      flag:false,
      timer:{},
      pic:[
        require('../assets/grey_audio.png'),
        require('../assets/voice.svg')
      ],
      index:0
    }
  },
  methods: {
    // 处理点击
    handleClick() {
      var that = this
      this.recording = !this.recording
      // 如果开始录音
      if (this.recording === true) {
        this.index=1;
        this.mcounter = 0
        this.tiptext = '录音中 ' + this.mcounter + 's'
        this.captureRecord()
        this.intervaltimerid = setInterval(() => {
          this.captureRecord()
          this.mcounter = this.mcounter + 1
          this.tiptext = '录音中 ' + that.mcounter + 's'
          this.handleClick()
        }, 1000)
      } else { // 如果结束录音
        this.tiptext = '点击录音'
        this.mediaRecorder.stop()
        this.mediaRecorder.stream.stop()
      }
    },
    // 错误处理方法
    onMediaError(e) {
      console.log('阿偶~您的浏览器貌似不支持录音哦...', e)
      clearInterval(this.intervaltimerid)
      this.tiptext = '点击录音'
      this.recording = false
      this.$message.error('您的浏览器暂不支持录音功能')
    },
    // 成功
    onMediaSuccess(stream) {
      this.mediaRecorder = new MediaStreamRecorder(stream)
      // 获取音频流
      this.mediaRecorder.stream = stream
      this.mediaRecorder.mimeType = 'audio/wav'
      var _that=this
      this.mediaRecorder.ondataavailable = function(blob) {
        clearInterval(_that.intervaltimerid)
        const url = URL.createObjectURL(blob)
        _that.$emit('handleStop', {
          url: url,
          mblob: blob
        })
        _that.handleClick()
      }
      // 定义间隔
      this.mediaRecorder.start(this.timelimit * 1000)
    },
    // 开始记录方法
    captureRecord() {
      navigator.mediaDevices
        .getUserMedia(this.mediaConstraints)
        .then(this.onMediaSuccess)
        .catch(this.onMediaError)
    }
  }
}
</script>
<style scoped>
.wrapper {
    text-align: center;
}
.wrapper div{
  width: 130px;
  height: 50px;
  float: left;
  font-size: 16px;
  color: white;
  line-height: 20px;
  text-align: center;
}
.wrapper div img {
  width: 30px;
  height: 30px;
  margin: 0 50px;
  margin-bottom: 5px;
  display: block;
}
</style>
