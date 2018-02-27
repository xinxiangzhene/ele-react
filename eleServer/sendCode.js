const SMSClient = require('@alicloud/sms-sdk')
var SendCode = {
  aliyun(phoneNumber,signName, templateCode,code,callback){
      const accessKeyId = 'LTAIWwoKWVMTZJs7'
      const secretAccessKey = 'EqMfrzlmRzsnXKPSygQA903QswCA4Q'
      //初始化sms_client
      let smsClient = new SMSClient({accessKeyId, secretAccessKey})
      //发送短信
      smsClient.sendSMS({
          PhoneNumbers: phoneNumber,
          SignName: signName,
          TemplateCode: templateCode,
          TemplateParam: '{"code":'+code+'}'
      }).then(function (res) {
          let {Code}=res
          if (Code === 'OK') {
              //处理返回参数
              callback(res)
          }
      }, function (err) {
          console.log(err)
      })
  }
}

module.exports = SendCode