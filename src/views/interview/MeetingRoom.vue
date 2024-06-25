<template>
  <div>
    <video autoplay id="localVideo" muted class="local-video"></video>
    <div class="layui-col-md9">
      <div class="layui-row" id="other-container">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetingRoom',
  data() {
    return {
      localStream: null,
      userId: '',
      roomId: '',
      roomList: [
        {
          userId: 'd8fad52d-0764-4016-93db-4f5fc1dfccd2'
        },
        {
          userId: 'e49d97a5-30b8-4ced-a348-50c13677465c'
        }
      ],
      RtcPcMaps: new Map(),
      rtcPcParams: {
        iceServers: [
          {urls: 'stun:stun.l.google.com:19302'}
        ]
      },
      dialogVisible: false,
      url: '' + window.location.protocol + '//' + window.location.host + '/aisite/signal/',
      ws: null
    }
  },
  created() {
    this.initMeetingRoom()
  },
  methods: {
    initMeetingRoom() {
      this.userId = this.$store.state.user.userId
      this.roomId = this.$route.query.roomId
      // window.onbeforeunload = function () {
      //   this.disConnect()
      // }
      this.start()
    },
    disConnect() {
      if (this.ws) {
        this.ws.close()
      }
    },
    start() {
      if (typeof (WebSocket) == "undefined") {
          // console.log('您的浏览器不支持WebSocket')
          return false
      }
      //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
      if (this.ws != null) {
          this.ws = null
      }
      // this.ws = new WebSocket(this.url + this.roomId + '/' + this.userId + '/' + 1)
      this.ws = new WebSocket('ws://localhost:9090/aisite/signal/1/' + this.userId + '/1')
      //打开事件
      this.ws.onopen = this.onOpen
      //关闭事件
      this.ws.onclose = this.onClose
      //发生了错误事件
      this.ws.onerror = this.onError
      // 接收消息
      this.ws.onmessage = this.onMessage
      this.onOpen()
    },
    onOpen() {
      // console.log('信令服务器连接成功')
      // 开始建立房间
      // setTimeout(async () => {
      //   if (this.roomList.length) {
      //     await this.initRoom()
      //   }
      // }, 2000)
      this.initRoom()
    },
    async initRoom() {
      if(!this.localStream){
        this.localStream = await this.getLocalUserMedia()
        this.setDomVideoStream("localVideo", this.localStream)
      }
      const localUid = this.userId
      // 找到当前房间的视频流发布者 即主播
      var others = this.roomList.filter(e => e.userId !== localUid).map((e) => {
        return e.userId
      })
      others.forEach(async (uid) => {
        //和发布者建立RTC连接 不发送自己视频流
        var pcKey = localUid + '-' + uid
        var pc = this.RtcPcMaps.get(pcKey)
        if (!pc) {
          pc = new window.RTCPeerConnection(this.rtcPcParams)
          this.RtcPcMaps.set(pcKey, pc)
        }
        for (const track of this.localStream.getTracks()) {
          pc.addTrack(track)
        }
        this.onPcEvent(pc, localUid, uid)
        //创建offer
        var offer = await pc.createOffer()
        //设置offer未本地描述
        await pc.setLocalDescription(offer)
        //发送offer给被呼叫端
        var params = {'type': 'offer', "targetUid": uid, "userId": localUid, "offer": offer}
        this.sendMsg(params)
      })
    },
    onPcEvent(pc, localUid, remoteUid) {
      pc.ontrack = function (event) {
        this.createOtherDom(remoteUid, event.track)
      }
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          let params = {
            'type': 'candidate', 'targetUid': remoteUid, "userId": localUid, "candidate": event.candidate
          }
          this.sendMsg(params)
        } else {
            /* 在此次协商中，没有更多的候选了 */
          // console.log("在此次协商中，没有更多的候选了")
        }
      }
    },
    async getLocalUserMedia() {
      var constraints = {video: true, audio: true}
      return await navigator.mediaDevices.getUserMedia(constraints)
    },
    async setDomVideoStream(domId, newStream) {
      var video = document.getElementById(domId)
      var stream = video.srcObject
      if (stream) {
        stream.getAudioTracks().forEach(e => {
          stream.removeTrack(e)
        })
        stream.getVideoTracks().forEach(e => {
          stream.removeTrack(e)
        })
      }
      video.srcObject = newStream
      video.muted = true
    },
    createOtherDom(remoteUid, track){
      let id = remoteUid + '-video'
      
      console.log(this.id)
      let video = document.getElementById(id)
      if (!video) {
        video = document.createElement('video')
        video.id = id
        video.controls = false
        video.autoplay = true
        video.muted = false
        video.className = 'remote-video'
      }

      let stream = video.srcObject
      if (stream) {
        stream.addTrack(track)
      } else {
        let newStream = new MediaStream()
        newStream.addTrack(track)
        video.srcObject = newStream
        video.muted = false
      }
      let div = document.createElement('div')
      div.className = 'layui-col-xs5'
      div.appendChild(video)
      var otherContainer = document.getElementById('other-container')
      otherContainer.appendChild(div)
    },
    onMessage(msg) {
      msg = JSON.parse(msg.data)
      // 加入和离开房间
      if (msg.type === 'join' || msg.type === 'leave') {
        // 获取房间列表 用于更新
        setTimeout(() => {
          var params = {"type": "roomUserList", "roomId": this.roomId}
          this.sendMsg(params)
        }, 1000)
      }
      // 房间信息
      if (msg.type === 'roomUserList') {
        this.roomList = msg.data
        console.log(this.roomList)
      }
      // 呼叫信息
      if (msg.type === 'call') {
        // console.log('call')
      }
      // 信令
      if (msg.type === 'offer') {
        this.onRemoteOffer(msg.data.userId, msg.data.offer);
      }
      // 回应
      if (msg.type === 'answer') {
        this.onRemoteAnswer(msg.data.userId, msg.data.answer);
      }
      // 候选信息
      if (msg.type === 'candidate') {
        this.onCandiDate(msg.data.userId, msg.data.candidate)
      }
    },
    onCandiDate(fromUid, candidate) {
      const localUid = this.userId
      let pcKey = localUid + '-' + fromUid
      let pc = this.RtcPcMaps.get(pcKey)
      pc.addIceCandidate(candidate)
    },
    async onRemoteOffer(fromUid, offer) {
      let pcKey = this.userId + '-' + fromUid
      let pc = new window.RTCPeerConnection(this.rtcPcParams)
      this.RtcPcMaps.set(pcKey, pc);
      this.onPcEvent(pc, this.userId, fromUid)
      for (const track of this.localStream.getTracks()) {
        pc.addTrack(track)
      }
      pc.setRemoteDescription(offer)
      let answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      let params = {"type": "answer", "targetUid": fromUid, "userId": this.userId, "answer": answer}
      this.sendMsg(params)
    },
    async onRemoteAnswer(fromUid, answer) {
      const localUid = this.userId
      let pcKey = localUid + '-' + fromUid
      let pc = this.RtcPcMaps.get(pcKey)
      await pc.setRemoteDescription(answer)
    },
    sendMsg(obj) {
      if (this.ws && this.ws.readyState === 1) {
        this.ws.send(JSON.stringify(obj))
      } else {
        // console.log('请检查连接是否正常？')
      }
    },
    onError() {
      // console.log('信令服务器连接失败')
    },
    onClose() {
      // console.log('信令服务器已关闭')
    }
  }
}
</script>

<style scoped>
.local-video {
  margin: 40px 20px 20px 20px;
  width: 400px;
}
</style>