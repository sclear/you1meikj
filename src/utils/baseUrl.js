import { fetch } from './http'
import { ipurl } from './ipurl'

//====================================  登录=================================
const login = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Login/login',data);
}

//show 
const goPHP = (data)=>{
    return fetch('get',ipurl+'/go.php',data);
}


//=====================================     上传图片  ===============



const upload = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Upload/pictureUpload',data,1);
}

const uploadlogo = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Upload/logoUpload',data,1);
}



//===================================    客户信息    ==========================



//获取客户信息   
const getAT = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Contactus/getAT',data);
}
//客户信息 未处理 => 已处理  
const upCustomer = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Contactus/upCustomer',data);
}
//删除客户信息  
const delCustomer = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Contactus/delCustomer',data);
}



//===================================     案例   ==========================


//案例查询
const getCA = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Cases/getCA',data);
}
//删除案例
const delCase = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Cases/delCase',data);
}
//案例添加
const addCase = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Cases/addCase',data);
}
//案例修改
const upShow = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Cases/upShow',data);
}
//修改案例内容  
const upCase = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Cases/upCase',data);
}
//主页展示的案例 
const getCase = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Cases/getCase',data);
}


//================================  用户信息  ================================


//查找所有用户
const getVague = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Useradmin/getVague',data);
}
//添加用户  
const addUser = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Useradmin/addUser',data);
}
//删除用户
const delUser = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Useradmin/delUser',data);
}
//重置用户密码
const Reset = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Useradmin/Reset',data);
}
//修改用户权限
const setUserPower = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Useradmin/setUserPower',data);
}
//修改个人信息
const upUser = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Useradmin/upUser',data);
}



//=============================== 权限  ====================================

//获取菜单  
const getMenu = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Power/getMenu',data);
} 
//查询所有权限
const getAllrole = (data)=>{ 
    return fetch('post',ipurl+'/public/?s=admin/Power/getAll',data);
}
//添加权限名称  
const addPower = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Power/addPower',data);
}
//修改权限名称  
const upPower = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Power/upPower',data);
}
//删除权限名
const delPower = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Power/delPower',data);
}
//获取权限菜单
const getPower = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Power/getPower',data);
}
//权限设置  
const setPower = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Power/setPower',data);
}

//用户表  使用查询所有权限 
const UserPowerAll = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Power/getPowerAll',data);
}


//================================ 项目管理 ================================
//获取所有项目信息  
const getItem = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Item/getItem',data);
}
//添加新项目
const addItem = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Item/addItem',data);
}
//修改项目信息
const upItem = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Item/upItem',data);
}
//删除项目信息
const delItem = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Item/delItem',data);
}


//=============================  设置  ====================================
//设置logo 公司名称
const setLogo = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Logo/setLogo',data);
}
//获取logo 公司名称
const getLogo = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Logo/getLogo',data);
}

//=============================  管理   ===============================


//获取管理信息
const getItemAdmin = (data)=>{
    return fetch('post',ipurl+'/public/?s=admin/Item/getItemAdmin',data);
}



export {
            //show
    goPHP,

    login,
            //上传
    upload,
    uploadlogo,
            //客户信息
    getAT,
    upCustomer,
    delCustomer,
            //案例
    getCA,
    delCase,
    addCase,
    upShow,
    upCase,
    getCase,
                //用户信息
    getVague,
    addUser,
    delUser,
    Reset,
    setUserPower,
    upUser,
                //权限
    getMenu,
    getAllrole,
    addPower,
    upPower,
    delPower,
    getPower,
    setPower,
    UserPowerAll,
                //项目管理
    getItem,
    addItem,
    upItem,
    delItem,
                //logo
    setLogo,
    getLogo,
                //获取管理信息
    getItemAdmin
}