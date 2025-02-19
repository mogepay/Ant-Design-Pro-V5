import { Request, Response } from 'express';
import { resData } from './data';
import { introduce, introduceAnchorList, input, inputAnchorList, password, passwordAnchorList, select, selectAnchorList, checkbox, checkboxAnchorList, radio, radioAnchorList, switchMock, switchAnchorList, textArea, textAreaAnchorList, rate, rateAnchorList, slider, sliderAnchorList, digit, digitAnchorList, field, fieldAnchorList } from './formMock'

// 延时时间
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /api/form/queryDetail': async (req: Request, res: Response) => {
    const { detail } = req.query;
    if (detail === 'introduce') {
      res.send(
        resData({
          list: introduce,
          anchorList: introduceAnchorList
        }
      ))
    } else if(detail === 'input'){
      res.send(
        resData({
          list: input,
          anchorList: inputAnchorList
        }
      ))
    } else if(detail === 'password'){
      res.send(
        resData({
          list: password,
          anchorList: passwordAnchorList
        }
      ))
    } else if(detail === 'select'){
      res.send(
        resData({
          list: select,
          anchorList: selectAnchorList
        }
      ))
    } else if(detail === 'checkbox'){
      res.send(
        resData({
          list: checkbox,
          anchorList: checkboxAnchorList
        }
      ))
    } else if(detail === 'radio'){
      res.send(
        resData({
          list: radio,
          anchorList: radioAnchorList
        }
      ))
    } else if(detail === 'switch'){
      res.send(
        resData({
          list: switchMock,
          anchorList: switchAnchorList
        }
      ))
    } else if(detail === 'textArea'){
      res.send(
        resData({
          list: textArea,
          anchorList: textAreaAnchorList
        }
      ))
    } else if(detail === 'rate'){
      res.send(
        resData({
          list: rate,
          anchorList: rateAnchorList
        }
      ))
    } else if(detail === 'slider'){
      res.send(
        resData({
          list: slider,
          anchorList: sliderAnchorList
        }
      ))
    } else if(detail === 'digit'){
      res.send(
        resData({
          list: digit,
          anchorList: digitAnchorList
        }
      ))
    }else if(detail === 'field'){
      res.send(
        resData({
          list: field,
          anchorList: fieldAnchorList
        }
      ))
    }
    res.send({
      code: 400,
      detail,
      message: '请输入参数'
    })
  },

}
