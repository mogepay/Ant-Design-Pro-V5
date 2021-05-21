
import moment from 'moment';

/**
 * @module 公用方法
 *
 */
class Method{

  /**
   * @module 日期转化
   *
   * @param type 默认为 1 格式 YYYY-MM-DD HH:mm:ss 年月日 时分秒
   * @param type 2 格式 YYYY-MM-DD
   */
  static Moment = (data:string, type: number = 1) => {
    let result = ''
    if(type === 1){
      result = moment(data).format('YYYY-MM-DD HH:mm:ss')
    }else if(type === 2){
      result = moment(data).format('YYYY-MM-DD')
    }
    return result
  }

  /**
   * @module 防抖
   *
   * @param fn 包裹的函数
   * @param await 时长，默认1000
   * @param immediate 是否在触发事件后 在时间段n开始，立即执行，否则是时间段n结束，才执行
   */
  static Debounce(fn:Function, awit:number=1000, immediate:boolean=false){
    let timer:NodeJS.Timeout|null
    return (...args:any) => {
      if(timer) clearInterval(timer)
      if(immediate){
        if(!timer) fn.apply(this,args);
        timer = setTimeout(() => {//n 秒内 多次触发事件,重新计算.timeer
          timer = null;//n 秒内没有触发事件 timeer 设置为null，保证了n 秒后能重新触发事件 flag = true = !timmer
        },awit)
      }else{
        timer = setTimeout(()=>{ fn.apply(this,args)}, awit)
      }
    }
  }

  /**
   * @module 节流
   *
   * @param fn 包裹的函数
   * @param await 时长，默认1000
   */
  static Throttle(fn:Function, awit:number=1000, immediate:boolean=true){
    let timer: NodeJS.Timeout|null;
    return (...args:any) => {
      if(!timer){
        fn.apply(this,args)
        timer = setTimeout(() => {
          timer&&clearTimeout(timer)
          timer= null
        }, awit);
      }
    }
  }

}

export default Method
