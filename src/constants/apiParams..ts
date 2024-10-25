export class API_PARAMS {
	public static API_VERSION = 'api/v1';

	/**
	 * Health
	 */

	public static HEALTH = '/health';

	/**
	 * User APIs
	 */
	public static USERS = this.API_VERSION + '/users';

	public static LOGIN = '/login';
	public static REGISTER = '/register';
	public static REFRESH_TOKEN = '/refresh';
	public static ACTIVE_USER = '/active-user';
	public static LOGOUT = '/logout';
	public static ME = '/me';
	public static EMAIL_VERIFY = '/email_verify';

	/**
	 * Impacts APIs
	 */

	public static IMPACTS = this.API_VERSION + '/impacts';

	public static IMPACT_METHODS = '/impact-methods';
	public static CATEGORIES = '/categories';

	/**
	 * Project APIs
	 */
	public static PROJECTS = this.API_VERSION + '/projects';
}
