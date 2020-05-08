import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  constructor(private http:HttpClient) { }
  

  ngOnInit(): void {
  }

  // onFormSubmit(){
  //   this.chargeCreditCard();
  // }

  chargeCreditCard(cardNumber,expMonth,expYear,cvc,amount) {
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token,amount);
      } else {
        console.log(response.error.message);
      }
    });
    console.log(cardNumber);
  }

  chargeCard(token: string,amount1) {
    console.log(amount1);
    let amount:number=+amount1;
    const headers = new HttpHeaders({'token': token});
    this.http.post('http://localhost:8080/payment/charge',amount, {headers: headers,responseType:'text'})
      .subscribe(resp => {
        console.log(resp);
      });
  }
  

}
