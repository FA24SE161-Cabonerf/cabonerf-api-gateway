interface CreateConnectorReqBody {
	startProcessId: string;
	endProcessId: string;
	startExchangesId: string;
	endExchangesId: string;
}

interface Connector {
	id: string;
	startProcessId: string;
	endProcessId: string;
	startExchangesId: string;
	endExchangesId: string;
}

export { CreateConnectorReqBody, Connector };
