import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { Component } from "react";
class Payment extends React.Component {
    // const[alignment, setAlignment] = React.useState('left');

    constructor(props) {
        super(props);

        this.state = {
            subvalue: this.props.fomdata,

        };
    }
    componentDidMount() {
        //this.checkidverification()
        
         this.showrazorPay()



    }

    // parentupdate = (value) => {
    //     handleChildUpdate(value)
    // }
    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

   
    showrazorPay = async () => {
       
      
     
      
        const res = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        await this.props.orderId()

    
        const options = {
            key: 'rzp_test_ipbJ8OB0OUxB2u',
            currency: "INR",
            amount: (parseInt(this.props.orderno.checkedFees) * 100).toString(),
            order_id: this.props.orderno.order_id,
            name: 'KTTA',
            description: 'Subsciption amount',

            handler: (response) => {

                if (response.razorpay_payment_id)
                
                { this.props.submit(response.razorpay_payment_id) }






            },
            prefill: {
                name: this.state.subvalue.userName,
                email: this.state.subvalue.emailAddress,
                phone_number: '9899999999'
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.on('payment.failed', function (response) {

            alert(response.error.description);

        });
        paymentObject.open()

    };

    render() {
        const { classes, loading } = this.props;
        const { value } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <div

                >

                  


                </div>
               
                       
                         
            </React.Fragment>
        );
    }
}
export default (Payment);
