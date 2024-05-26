import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

	@Get('test')
	public async getTestResponse() {
		return {
			success: true,
			message: 'This is a test message from the backend server!'
		};
	}

}
