import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import emailjs from '@emailjs/browser';
import { from } from 'rxjs';

// Services
import { ApiService } from '../common/api.service';
import { ApiConstants, API_CONSTANTS } from '../api_constants';

// Params
import { ParamContactFlowRes, ParamPostContact } from '../params/contact-param';


@Injectable({
  providedIn: 'root'
})
export class ApiContactService {

	constructor(
		private apiService: ApiService,
		@Inject(API_CONSTANTS) public apiConstants: ApiConstants
	) { }



	add(contact: ParamPostContact): Observable<ParamPostContact> {
		// console.log(data);

		const params = contact;
		return this.sendEmail(params);
		

		
	}

	sendEmail(params: any): Observable<any> {
		debugger
		return from(
		  emailjs.send(
			'default_service',       // Replace with your Service ID
			'template_c1v4895',      // Replace with your Template ID
			{
				name : params.name,
				email : params.email,
				message : params.details
			},
			'eK7tJ3Az12PprZZ2b'        // Replace with your public key
		  )
		);
	  }


}
