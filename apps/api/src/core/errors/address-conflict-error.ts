import { AppError } from './app-error'

export class AdressConflictError extends AppError {
	constructor(message = 'Cannot delete the default address') {
		super(message, 409, 'DEFAULT_ADDRESS_DELETION')
	}
}
