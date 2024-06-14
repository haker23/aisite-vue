<template>
  <div>
    <video id="video-container" autoplay></video>
  </div>
</template>

<script>
  import AgoraRTC from "agora-rtc-sdk-ng";
  export default {
    name: 'video',
    data () {
      return {

      }
    },
    created () {
      const rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      const uid = rtcClient.join('79a6bf0fe20640159719aacbcdccafcf', '0c91f87436624110bc76a882520e22f2', '007eJxTYNA1uqO00Vr/UueumRwNTouM5hYqByvsCrCRn6vMNM/7u7cCg7llollSmkFaqpGBmYmBoamluaFlYmJyUnJKcnJiWnJa1MbstIZARoa0phoWRgYIBPGZGAwNGRgAP4ob9Q==', null);
      const localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
      const localVideoTrack = AgoraRTC.createCameraVideoTrack();
      // 播放视频轨道
      localVideoTrack.play(document.getElementById('video-container'));
      // 播放音频轨道
      localAudioTrack.play();
    },
    methods: {

    }
  }
</script>

<style>

</style>