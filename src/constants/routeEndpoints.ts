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
	 * Impacts Endpoint
	 */

	public static IMPACTS = '/impacts';

	// Impact Method
	public static IMPACT_METHODS = '/impact-methods';

	// Impact Category

	public static IMPACT_CATEGORIES = '/impact-categories';

	// Impact Midpoint
	public static MIDPOINTS = '/midpoint-factors';

	/**
	 * Project
	 */
	public static PROJECTS = '/projects';

	/**
	 * Health Check Services
	 */
	public static GATEWAY_HEALTH = '/gateway-health';
	public static MAIN_HEALTH = '/main-health';

	/**
	 * Admin
	 */
	public static ADMIN = '/admin';
}
