const DIYtoast = (value) => {
    let cont = document.createElement('div')
    cont.innerHTML = value
    cont.className = 'Z-toast'
    document.body.appendChild(cont)
    setTimeout(() => {
        document.body.removeChild(cont)
    }, 2000)
}


//时间戳 => 时间
const toTime = (timestamp, res)=>{
    let date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate();
    let h = date.getHours() + ':';
    let m = date.getMinutes();
    let s = date.getSeconds();

    if (res === 'y-m-d') return (Y + M + D)
    else if (res === 'h:m') return (h + m)
    else if (res === 'h:m:s') return (h + m + ':' + s)
    else return Y + M + D + ' ' + h + m + ':' + s
}
//验证邮箱
const isEmail = (value)=> {
    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
}
//验证电话 
const isPhone = (value)=> {
    return /^0?1[3-9][0-9]\d{8}$/.test(value);
}
export {
    DIYtoast,
    toTime,
    isEmail,
    isPhone
}