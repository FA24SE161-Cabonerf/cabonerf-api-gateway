export class ROUTE_ENDPOINTS {
	/**
	 * Auth Endpoint
	 */
	public static USERS = '/users';

	public static LOGIN = this.USERS + '/login';
	public static REGISTER = this.USERS + '/register';
	public static LOGOUT = this.USERS + '/logout';
	public static ME = this.USERS + '/me';

	/**
	 * Impact Endpoint
	 */

	public static IMPACTS = '/impacts';

	public static IMPACT_METHODS = this.IMPACTS + '/impact-methods';
	public static CATEGORIES = '/categories';

	/**
	 * Project
	 */
	public static PROJECTS = '/projects';

	/**
	 * Health Check Services
	 */
	public static GATEWAY_HEALTH = '/gateway-health';
	public static MAIN_HEALTH = '/main-health';
}
