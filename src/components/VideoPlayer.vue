<template>
  <div>
    <div class="el-video-box"  @click="viewVideo" :style="{'width':`${width}px`,'height':`${height}px`}" v-show="isLoaded">
      <video :width="width" :height="height"  :style="{'object-fit': fit}" ref="myvideo" crossorigin="anonymous">
        <source :src="src">
  
      </video>
      <img src='@/assets/images/play.png' style="position: absolute;" v-if="showPlayIcon"
           :style="{width:`${width/2}px`,height:`${height/2}px`,top: `${height/4}px`,left: `${width/4}px`}"/>
    </div>
    <div v-show="!isLoaded" class="el-video-box error-box"  @click="viewVideo" :style="{'width':`${width}px`,'height':`${height}px`}">
      <div v-if="enableCustomEorror">
        <slot name="customError"></slot>
      </div>
      <span class="errorIcon" v-else>加载失败</span>
    </div>
    <el-dialog  :visible.sync="showVideo"  :fullscreen="true" class="videoDialog">
      <div style="margin: 100px auto;width: 800px;height: 600px;" v-if="!customPreview">
        <video width="800" height="600" controls ref="video" crossorigin="anonymous">
          <source :src="src">
        </video>
      </div>
      <div v-if="customPreview">
        <slot name="previewVideo">
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props:{
    width:{
      type:String,
      default: '60'
    },
    height:{
      type:String,
      default: '60'
    },
    fit:{
      type:String,
      default: 'none'
    },
    src:{
      type:String,
      default: ''
    },
    customPreview:{
      type:Boolean,
      default: false
    },
    enablePreview:{
      type:Boolean,
      default: false
    },
    enableCustomEorror:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      showVideo: false,
      showPlayIcon: true,
      isLoaded: false,
    }
  },
  mounted() {
    this.$refs.myvideo.addEventListener('loadedmetadata',()=>{
      this.isLoaded=true
      this.$emit('loadeddataCallback',this.$refs.myvideo)
    })
  },
  computed:{

  },
  watch:{
    showVideo:function(newVal){
      if(newVal){
        this.$nextTick(()=>{
          this.$refs.video && this.$refs.video.load()
        })
      }
    }
  },
  methods:{
    viewVideo(){
      if(this.enablePreview&&this.isLoaded){
        this.showVideo=true
          this.$emit('openPreviewCallback',this.customPreview)
      }else{
        if(this.$refs.myvideo.paused){
          this.showPlayIcon=false
          this.$refs.myvideo.play()
        }else{
          this.$refs.myvideo.pause()
          this.showPlayIcon=true
        }
      }

    }
  }
}
</script>

<style scoped>
.videoDialog /deep/ .el-dialog__headerbtn{
  top: 50px;
  right: 70px;
  background: rgba(102, 104, 107,0.6);
  cursor: pointer;
  font-size: 24px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid gray;
}
.videoDialog /deep/ .el-dialog.is-fullscreen{
  background: rgba(0,0,0,0.05);
}
.videoDialog /deep/ .el-dialog__headerbtn .el-dialog__close{
  color: whitesmoke;
}
.videoDialog /deep/ .el-dialog__headerbtn .el-dialog__close:hover{
  color: whitesmoke;
}
.el-video-box{
  position: relative;
  cursor: pointer;
  border: 1px solid lightgrey;
}
.errorIcon{
  font-size: 12px;
  vertical-align: middle;
  color: gray;
}
.error-box{
  line-height: 70px;
  text-align: center;
}
</style>