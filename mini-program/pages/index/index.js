// index.js
Page({
  data: {
    socket: null,
    foods: []
  },
  onLoad: function() {
    const socketTask = wx.connectSocket({
      url: 'ws://localhost:9898',
      header:{
        'content-type': 'application/json'
      }
    })
    socketTask.onMessage((res) => {
      const serverData = JSON.parse(res.data)
      console.log(serverData)
      this.data.foods.push(serverData)
      this.setData({
        foods: this.data.foods
      })
    })
    this.setData({
      socket: socketTask
    })
  },

  onOrderFood: function (res) {
    const { target: { dataset: { attr } } } = res
    const { data: { socket } } = this
    console.log(attr, socket)
    const _data = JSON.stringify({ userId: 1, food: attr})

    socket.send({ data: _data })
  }
})
