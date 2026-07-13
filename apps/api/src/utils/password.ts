import { argon2id, hash, verify } from 'argon2'

export function hashingPassword(password: string): Promise<string> {
	return hash(password, {
		type: argon2id,
		memoryCost: 65536,
		timeCost: 3,
		parallelism: 3,
	})
}

export function verifyPassword(
	passwordHash: string,
	passwordRaw: string,
): Promise<boolean> {
	return verify(passwordHash, passwordRaw)
}
