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
	public static MIDPOINT_FACTORS = '/midpoint-factors';

	// Midpoint Impact Category
	public static MIDPOINT_CATEGORIES = '/midpoint-categories';

	/**
	 * Unit
	 */
	public static UNITS = '/units';

	/**
	 * Unit group
	 */
	public static UNIT_GROUPS = '/unit-groups';

	/**
	 * Project
	 */
	public static PROJECTS = '/projects';

	/**
	 * Process
	 */
	public static PROCESS = '/process';

	/**
	 * Life Cycle Stages
	 */
	public static LIFE_CYCLE_STAGES = '/life-cycle-stages';

	/**
	 * Perspectives
	 */
	public static PERSPECTIVES = '/perspectives';

	/**
	 * Connector
	 */
	public static CONNECTOR = '/connectors';

	/**
	 * Exchange
	 */
	public static EXCHANGES = '/exchanges';
	public static ELEMENTARY_EXCHANGE = '/elementary-exchange';
	public static PRODUCT_EXCHANGE = '/product-exchange';

	/**
	 * Health Check Services
	 */
	public static GATEWAY_HEALTH = '/gateway-health';
	public static MAIN_HEALTH = '/main-health';

	public static NODEBASED_HEALTH = '/nodebased-health';

	/**
	 * Admin
	 */
	public static ADMIN = '/admin';
}
