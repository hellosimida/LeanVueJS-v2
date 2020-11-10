export default {
  template: `
    <div>
      <h2>{{message}}</h2>
      <button @click="btnClick()">°´Å¥</button>
    </div>
  `,
  data() {
    return {
      message: 'hello world'
    }
  },
  methods: {
    btnClick(){
      console.log("btnClick")
    }
  }
}