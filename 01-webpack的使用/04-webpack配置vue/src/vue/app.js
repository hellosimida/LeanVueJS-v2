export default {
  template: `
    <div>
      <h2>{{message}}</h2>
      <button @click="btnClick()">��ť</button>
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