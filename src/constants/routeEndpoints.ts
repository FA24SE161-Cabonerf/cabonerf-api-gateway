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
	public static IMPORT_MIDPOINT_FACTORS = '/midpoint-factors/import';
	public static EXPORT_MIDPOINT_FACTORS = '/midpoint-factors/export';
	public static DOWNLOAD_ERROR_LOG_MIDPOINT_FACTORS = '/midpoint-factors/download';
	public static DOWNLOAD_TEMPLATE_MIDPOINT_FACTORS = '/midpoint-factors/factor-template';

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
	public static CALCULATION = '/calculation';

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
	 * Emisison
	 */
	public static EMISSIONS = '/emissions';

	/**
	 * Emission substance
	 */
	public static EMISSION_SUBSTANCE = '/emission-substance';

	/**
	 * Emission compartment
	 */
	public static EMISSION_COMPARTMENT = '/emission-compartments';

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
	public static BAN_UNBAN = '/ban-unban-user';

	/**
	 * Workspace
	 */

	public static WORKSPACE = '/workspaces';
}
