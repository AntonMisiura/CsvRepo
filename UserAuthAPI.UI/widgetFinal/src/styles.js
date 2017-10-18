var widgetStyles = `
            .visible{
                display: block;

            }
            .hidden{
                display: none;
            }
            .login-reg-link{

                display: inline-block; 
                margin-right: 10px; 
                width: 100px; text-align:center; 
                display: inline-block;
                position: relative;
                padding: .61538462em 1em;
                vertical-align: middle;
                min-height: 2.46153846em;
                box-sizing: border-box;
                font-weight: 400;
                font-family: inherit;
                line-height: 1;
                text-align: center;
                text-decoration: none;
                background-color: transparent;
                border-radius: 2px;
                border: 1px solid transparent;
                cursor: pointer;
                outline: none;
                touch-action: manipulation;
                transition: all .1s ease-in;
                text-decoration: none; 
                padding: 6px 12px;
                transition: 0.3s ease-in-out;
                color: #07C;
                background-color: rgba(0,119,204,0);
                border-color: transparent;
                box-shadow: none;
            }
            .login-reg-link:hover{
                    color: #005999;
                    background-color: rgba(0,119,204,0.1);
                    border-color: transparent;
                    box-shadow: none;
            }
            .forgot-password-link{
                    position: relative;
                    top: -8px;
                    color: #9fa6ad;
                    font-size: 11px;
                    font-weight: normal;
                    cursor: pointer;
                    text-align: right;
            }
            .forgot-password-link:hover{
                color: #000;
            }

            .login-reg-button{
                text-align: center;
                background: #07C;
                color: #FFF;
                border-radius: 3px;
                width: 100%;
                padding: 12px;
                box-shadow: none;
                text-shadow: none;
                text-decoration: none;
                border: none;
                cursor: pointer;
                margin-bottom: 0 !important;
            }
            .reg{
                    color: #FFF;
    background-color: #0095ff;
    border-color: #07c;
    box-shadow: inset 0 1px 0 #66bfff;
            }
.reg:hover{
        color: rgba(255,255,255,0.9);
    background-color: #07c;
    border-color: #005999;
    box-shadow: inset 0 1px 0 #3af;
}
            .login-reg-form{
    width: 280px;
    margin: 0 auto;
    padding: 30px;
    border: 1px solid #e4e6e8;
    background: #FFF;
}
.login-reg-input{    width: 100%;
    line-height: 1.3;
    font-size: 100%;
    padding: 8px;
    margin-bottom: 10px;
    
    border: 1px solid #e4e6e8;
    border-radius: 0;
    cursor: auto !important;
}
.login-reg-input:hover, .login-reg-input:focus
{
        border: 1px solid lightblue !important;
}
    .form-error{
        color: red;
    }
button {
    height: auto;
    border: none;
    margin-bottom: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &[disabled] {
        cursor: default;
    }
}
.facebook-button{
    background-color: #4267b2;
    font-family: Helvetica, Arial, sans-serif;
    color: #fff;
    border: none;
    height: 40px;
    letter-spacing: .25px;
    font-size: 14px;
    border-radius: 2px;
    overflow: hidden;
    text-align: center;
    text-overflow: clip;
    white-space: nowrap;
    vertical-align: middle;
    position: relative;
    width: 100%;

    
}
.fb-logo{
        width: 40px;
        height: 40px;
        display: block;
        position: absolute;
        left: 0px;
        top: 3px;
        padding-top: 6px;
    }
    .fb-svg{
        width: 24px;
        height: 24px;

    }
.google-button{
    background-color: #4285f4;
    font-family: Roboto,arial,sans-serif;
    color: #fff;
    height: 40px;
    width: 100%;
    font-weight: 500;
    letter-spacing: .21px;
    vertical-align: top;
    font-size: 14px;
    position: relative;
}
.g-logo{
        background-color: #fff;
        width: 24px;
        height:24px;
        position:  absolute;
        left: 9px;
        top:8px;

    }
    .g-svg{
        margin-top: 3px;
    }




        `;
export { widgetStyles }