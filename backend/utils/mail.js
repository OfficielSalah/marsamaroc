const nodemailer = require("nodemailer");

const mailTransport = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: { user: process.env.MAILTRAP_USER, pass: process.env.MAILTRAP_PASS },
  });

const verifyEmailTemplate = (code) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title></title>
    
        <style type="text/css">
          @media only screen and (min-width: 670px) {
            .u-row {
              width: 650px !important;
            }
            .u-row .u-col {
              vertical-align: top;
            }
    
            .u-row .u-col-100 {
              width: 650px !important;
            }
          }
    
          @media (max-width: 670px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
            .u-row {
              width: calc(100% - 40px) !important;
            }
            .u-col {
              width: 100% !important;
            }
            .u-col > div {
              margin: 0 auto;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
    
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
    
          p {
            margin: 0;
          }
    
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
    
          * {
            line-height: inherit;
          }
    
          a[x-apple-data-detectors="true"] {
            color: inherit !important;
            text-decoration: none !important;
          }
    
          table,
          td {
            color: #000000;
          }
        </style>
    
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
      </head>
    
      <body
        class="clean-body u_body"
        style="
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          background-color: #ffffff;
          color: #000000;
        "
      >
        <table
          style="
            border-collapse: collapse;
            table-layout: fixed;
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            vertical-align: top;
            min-width: 320px;
            margin: 0 auto;
            background-color: #ffffff;
            width: 100%;
          "
          cellpadding="0"
          cellspacing="0"
        >
          <tbody>
            <tr style="vertical-align: top">
              <td
                style="
                  word-break: break-word;
                  border-collapse: collapse !important;
                  vertical-align: top;
                "
              >
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 650px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #dff1ff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 650px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          >
                            <table
                              style="font-family: 'Montserrat', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 30px 0px;
                                      font-family: 'Montserrat', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                          align="center"
                                        >
                                          <img
                                            align="center"
                                            border="0"
                                            src="https://seeklogo.com/images/M/marsa-maroc-logo-E2DA20F4A6-seeklogo.com.png"
                                            alt="Image"
                                            title="Image"
                                            style="
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                              clear: both;
                                              display: inline-block !important;
                                              border: none;
                                              height: auto;
                                              float: none;
                                              width: 40%;
                                              max-width: 260px;
                                            "
                                            width="260"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: 'Montserrat', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 0px;
                                      font-family: 'Montserrat', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                          align="center"
                                        >
                                          <img
                                            align="center"
                                            border="0"
                                            src="https://cdn.templates.unlayer.com/assets/1594365706232-520447-PITMC8-966.png"
                                            alt="Image"
                                            title="Image"
                                            style="
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                              clear: both;
                                              display: inline-block !important;
                                              border: none;
                                              height: auto;
                                              float: none;
                                              width: 48%;
                                              max-width: 312px;
                                            "
                                            width="312"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 650px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #f3fbfd;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 650px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          >
                            <table
                              style="font-family: 'Montserrat', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 20px 10px 10px;
                                      font-family: 'Montserrat', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      style="
                                        color: #1b262c;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <strong
                                          ><span
                                            style="
                                              font-size: 26px;
                                              line-height: 36.4px;
                                            "
                                            >Hi !</span
                                          ></strong
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: 'Montserrat', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px 50px;
                                      font-family: 'Montserrat', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      style="
                                        color: #1b262c;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 16px;
                                            line-height: 22.4px;
                                          "
                                          >Here is the confirmation code for your
                                          online form :</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: 'Montserrat', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 15px 50px;
                                      font-family: 'Montserrat', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      style="
                                        color: #000000;
                                        line-height: 130%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 130%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 26px;
                                            line-height: 33.8px;
                                          "
                                          ><strong
                                            ><span
                                              style="
                                                line-height: 33.8px;
                                                font-size: 26px;
                                              "
                                              >${code}</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 650px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #151418;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 650px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          >
                            <table
                              style="font-family: 'Montserrat', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 18px;
                                      font-family: 'Montserrat', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      style="
                                        color: #ffffff;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p style="font-size: 14px; line-height: 140%">
                                        <span
                                          style="
                                            font-size: 14px;
                                            line-height: 19.6px;
                                          "
                                          >All you have to do is copy the
                                          confirmation code and paste it to your
                                          form to complete the email verification
                                          process.</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
    `;
};
const resetPasswordTemplate = (url) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title></title>
  
      <style type="text/css">
        @media only screen and (min-width: 670px) {
          .u-row {
            width: 650px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
  
          .u-row .u-col-100 {
            width: 650px !important;
          }
        }
  
        @media (max-width: 670px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: calc(100% - 40px) !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
  
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
  
        p {
          margin: 0;
        }
  
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
  
        * {
          line-height: inherit;
        }
  
        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }
  
        table,
        td {
          color: #000000;
        }
        a {
          color: #0000ee;
          text-decoration: underline;
        }
      </style>
  
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"
        rel="stylesheet"
        type="text/css"
      />
    </head>
  
    <body
      class="clean-body u_body"
      style="
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        background-color: #ffffff;
        color: #000000;
      "
    >
      <table
        style="
          border-collapse: collapse;
          table-layout: fixed;
          border-spacing: 0;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          vertical-align: top;
          min-width: 320px;
          margin: 0 auto;
          background-color: #ffffff;
          width: 100%;
        "
        cellpadding="0"
        cellspacing="0"
      >
        <tbody>
          <tr style="vertical-align: top">
            <td
              style="
                word-break: break-word;
                border-collapse: collapse !important;
                vertical-align: top;
              "
            >
              <div
                class="u-row-container"
                style="padding: 0px; background-color: transparent"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 650px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #dff1ff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: transparent;
                    "
                  >
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 650px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div style="width: 100% !important">
                        <div
                          style="
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                          "
                        >
                          <table
                            style="font-family: 'Montserrat', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 30px 0px;
                                    font-family: 'Montserrat', sans-serif;
                                  "
                                  align="left"
                                >
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                  >
                                    <tr>
                                      <td
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <img
                                          align="center"
                                          border="0"
                                          src="https://seeklogo.com/images/M/marsa-maroc-logo-E2DA20F4A6-seeklogo.com.png"
                                          alt="Image"
                                          title="Image"
                                          style="
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                            clear: both;
                                            display: inline-block !important;
                                            border: none;
                                            height: auto;
                                            float: none;
                                            width: 40%;
                                            max-width: 260px;
                                          "
                                          width="260"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            style="font-family: 'Montserrat', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 0px;
                                    font-family: 'Montserrat', sans-serif;
                                  "
                                  align="left"
                                >
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                  >
                                    <tr>
                                      <td
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <img
                                          align="center"
                                          border="0"
                                          src="https://cdn.templates.unlayer.com/assets/1594365706232-520447-PITMC8-966.png"
                                          alt="Image"
                                          title="Image"
                                          style="
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                            clear: both;
                                            display: inline-block !important;
                                            border: none;
                                            height: auto;
                                            float: none;
                                            width: 45%;
                                            max-width: 292.5px;
                                          "
                                          width="292.5"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: transparent"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 650px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #f3fbfd;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: transparent;
                    "
                  >
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 650px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div style="width: 100% !important">
                        <div
                          style="
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                          "
                        >
                          <table
                            style="font-family: 'Montserrat', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 15px 10px;
                                    font-family: 'Montserrat', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    style="
                                      color: #1b262c;
                                      line-height: 140%;
                                      text-align: center;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="font-size: 14px; line-height: 140%">
                                      <strong
                                        ><span
                                          style="
                                            font-size: 26px;
                                            line-height: 36.4px;
                                          "
                                          >Forget your password ?</span
                                        ></strong
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            style="font-family: 'Montserrat', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 10px;
                                    font-family: 'Montserrat', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div align="center">
                                    <a
                                      href="${url}"
                                      target="_blank"
                                      style="
                                        box-sizing: border-box;
                                        display: inline-block;
                                        font-family: 'Montserrat', sans-serif;
                                        text-decoration: none;
                                        -webkit-text-size-adjust: none;
                                        text-align: center;
                                        color: #ffffff;
                                        background-color: #d12a21;
                                        border-radius: 60px;
                                        -webkit-border-radius: 60px;
                                        -moz-border-radius: 60px;
                                        width: 54%;
                                        max-width: 100%;
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        word-wrap: break-word;
                                        mso-border-alt: none;
                                        border-top-width: 0px;
                                        border-top-style: solid;
                                        border-top-color: #ccc;
                                        border-left-width: 0px;
                                        border-left-style: solid;
                                        border-left-color: #ccc;
                                        border-right-width: 0px;
                                        border-right-style: solid;
                                        border-right-color: #ccc;
                                        border-bottom-width: 6px;
                                        border-bottom-style: solid;
                                        border-bottom-color: #3b3d3c;
                                      "
                                    >
                                      <span
                                        style="
                                          display: block;
                                          padding: 15px 40px;
                                          line-height: 130%;
                                        "
                                        ><strong
                                          ><span
                                            style="
                                              font-size: 16px;
                                              line-height: 20.8px;
                                            "
                                            >Reset Password</span
                                          ></strong
                                        ></span
                                      >
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: transparent"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 650px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #151418;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: transparent;
                    "
                  >
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 650px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div style="width: 100% !important">
                        <div
                          style="
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                          "
                        >
                          <table
                            style="font-family: 'Montserrat', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 18px;
                                    font-family: 'Montserrat', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    style="
                                      color: #ffffff;
                                      line-height: 140%;
                                      text-align: center;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="font-size: 14px; line-height: 140%">
                                      Please Link Above to reset Password
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `;
};
module.exports = {
  verifyEmailTemplate,
  resetPasswordTemplate,
  mailTransport,
};
