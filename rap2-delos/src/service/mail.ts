import * as nodemailer from 'nodemailer'
import config from '../config'

export default class MailService {

  public static async sendMail(mailOptions: any) {

    const transporter = nodemailer.createTransport(config.mail)

    return new Promise((resolve, reject) => {
      transporter.verify(function(error) {
        if (error) {
          reject(error)
        } else {
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              reject(error)
            } else {
              resolve(info.response)
            }
          })
        }
      })
    })
  }

  public static send(to: string | string[], subject: string, html: string) {

    const transporter = nodemailer.createTransport(config.mail)

    const mailOptions = {
      from: `"RAP2 Notifier" <${config.mailSender}>`,
      to,
      subject,
      html,
    }

    return new Promise((resolve, reject) => {
      transporter.verify(function(error) {
        if (error) {
          reject(error)
        } else {
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              reject(error)
            } else {
              resolve(info.response)
            }
          })
        }
      })
    })
  }

  public static mailNoticeTemp = `<head>
  <base target="_blank" />
  </head>
  <body>
  <div id="content" bgcolor="#f0f0f0" style="background-color:#f0f0f0;padding:10px">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td valign="top">
          <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
            bgcolor="#ffffff" style="background-color:#ffffff; width:700px;">
            <tr>
              <td style="vertical-align:top;">
                <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                  style="width:700px;">
                  <tr>
                    <td valign="top">
                      <table class="full-width" width="549" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                          <td width="32" valign="middle" style="padding-top:30px; padding-bottom:32px; width:32px;"><img width="140" height="34" src="http://img.alicdn.com/tfs/TB1vtTllHH1gK0jSZFwXXc7aXXa-140-34.png"></td>
                          <td valign="middle"></td>
                          <td width="10"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td valign="top" style="padding-top:10px ;">
                <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                  bgcolor="#ffffff" style="background-color:#ffffff; width:700px;">
                  <tr>
                    <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                    <td class="mobile-headline"
                      style="color:#000000; font-size:24px; line-height:26px;">{=TITLE=}</td>
                    <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                    <td
                      style="color:#555555; font-size:15px; line-height:20px; padding-top:30px;">
                      <ul style="margin-bottom:0px; margin-top:0px;">
                        {=CONTENT=}
                      </ul>
                    </td>
                    <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                  </tr>
                </table>
                <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                  bgcolor="#F7F8F9" style="background-color:#F7F8F9; width:700px;">
                  <tr>
                    <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                    <td
                      style="color:#555555; font-size:15px; line-height:20px; padding-top:30px; padding-bottom:30px;">
                      <strong>????????????????????????,??????????????????</strong>
                      </td>
                    <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                  bgcolor="#3f51b5" style="background-color:#3f51b5; width:700px;">
                  <tr>
                    <td width="22">&nbsp;</td>
                    <td align="center"
                      style="color:#ffffff; font-size:11px; line-height:14px; padding-top:20px;text-align:center;">
                      <strong><a href="http://rap2.alibaba-inc.com/"
                      style="color:#ffffff; font-weight:bold; text-decoration:none;">RAP2</a> | <a
                          href="https://github.com/thx/rap2-delos"
                          style="color:#ffffff; font-weight:bold; text-decoration:none;">GitHub</a></strong>
                    </td>
                    <td width="22">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="22" colspan="3">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  <style type="text/css">
    body {
      font-size: 14px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      line-height: 1.666;
      padding: 0;
      margin: 0;
      overflow: auto;
      white-space: normal;
      word-wrap: break-word;
      min-height: 100px
    }
  </style>
  </body>`

public static mailFindpwdTemp = `<head>
<base target="_blank" />
</head>
<body>
<div id="content" bgcolor="#f0f0f0" style="background-color:#f0f0f0;padding:10px">
  <table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td valign="top">
        <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
          bgcolor="#ffffff" style="background-color:#ffffff; width:700px;">
          <tr>
            <td style="vertical-align:top;">
              <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                style="width:700px;">
                <tr>
                  <td valign="top">
                    <table class="full-width" width="549" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                        <td width="32" valign="middle" style="padding-top:30px; padding-bottom:32px; width:32px;"><img width="140" height="34" src="http://img.alicdn.com/tfs/TB1vtTllHH1gK0jSZFwXXc7aXXa-140-34.png"></td>
                        <td valign="middle"></td>
                        <td width="10"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td valign="top" style="padding-top:10px ;">
              <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                bgcolor="#ffffff" style="background-color:#ffffff; width:700px;">
                <tr>
                  <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                  <td class="mobile-headline"
                    style="color:#000000; font-size:24px; line-height:26px;">
                    {=NAME=} ??????????????????????????????????????????</td>
                  <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                </tr>
                <tr>
                  <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                  <td
                    style="color:#555555; font-size:15px; line-height:20px; padding-top:30px;">
                    <ul style="margin-bottom:0px; margin-top:0px;">
                      <li style="padding-bottom:15px;">???????????????????????????????????????????????????<strong>1???????????????</strong></li>
                      <li style="padding-bottom:15px;"><a href="{=URL=}"
                          style="color:#1473E6; font-weight:bold; text-decoration:none;">????????????</a></li>
                      <li style="padding-bottom:15px;">?????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
                      <li style="padding-bottom:25px;">{=URL=}</li>
                    </ul>
                  </td>
                  <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                </tr>
              </table>
              <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                bgcolor="#F7F8F9" style="background-color:#F7F8F9; width:700px;">
                <tr>
                  <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                  <td
                    style="color:#555555; font-size:15px; line-height:20px; padding-top:30px; padding-bottom:30px;">
                    <strong>????????????????????????????????????</strong>??????RAP2??????????????????????????????????????????????????????????????????????????????????????????
                    <br><br>???????????????????????????????????????????????????
                    <br><br>????????????????????????????????????<a href="http://rap2.taobao.org/account/unsubscribe" style="color:#1473E6; font-weight:bold; text-decoration:none;">????????????</a>
                    </td>
                  <td class="mobile-spacer" width="30" style="width:30px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <table class="full-width" align="center" width="700" border="0" cellpadding="0" cellspacing="0"
                bgcolor="#3f51b5" style="background-color:#3f51b5; width:700px;">
                <tr>
                  <td width="22">&nbsp;</td>
                  <td align="center"
                    style="color:#ffffff; font-size:11px; line-height:14px; padding-top:20px;text-align:center;">
                    <strong><a href="http://rap2.taobao.org/"
                        style="color:#ffffff; font-weight:bold; text-decoration:none;">RAP2</a> | <a
                        href="https://github.com/thx/rap2-delos"
                        style="color:#ffffff; font-weight:bold; text-decoration:none;">GitHub</a></strong>
                  </td>
                  <td width="22">&nbsp;</td>
                </tr>
                <tr>
                  <td width="22" colspan="3">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
<style type="text/css">
  body {
    font-size: 14px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.666;
    padding: 0;
    margin: 0;
    overflow: auto;
    white-space: normal;
    word-wrap: break-word;
    min-height: 100px
  }
</style>
</body>`
}