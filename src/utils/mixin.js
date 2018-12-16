//minxis 公用 属性
export default {
    data() {
        return {
            activeName: "first",    //选项卡位置
            model: false,           //model状态
            list: [1],              //表单内容
            total: 0,               //总条数
            pagesize: 10,           //每页数量
            nowSize: 1,             //当前页码
            tabModel: {},           //model 内容
            disable: false,         //禁止model输入
            add:false,              //分辨添加 和 编辑
        }
    },
    methods: {
        //开关model
        CLOSE() {
            this.model = !this.model;
        },
        //添加 开启model
        addRoleName() {
            this.CLOSE();
            this.tabModel = {};
            this.disable = false;
            this.add = true;
            this.Ttxt = '添加项目'
        },
        //分页
        changeSize(res) {
            this.nowSize = res;
            this.getInfo()
        },
    }
}