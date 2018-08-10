// @flow

type
    $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

declare type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

declare type Action = {
    type: string,
    payload?: Object | number
};

declare type GetState = () => State;

declare type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;
declare type Dispatch = ReduxDispatch<Action> & Thunk<Action>;

declare type User = {
    email: string,
    email_verified: boolean,
    family_name: string,
    given_name: string,
    hd: string,
    locale: string,
    name: string,
    picture: string,
    sub: string,
    isFetching: boolean
};

declare type OvertimeType = {
    overtimeData: Object,
    isFetching: boolean,
    harvestUserId: string,
    firstName: string,
    lastName: string,
    startDate: string,
    loggedTimesYearMonth: Object
};

declare type Match = {
    isExact: boolean,
    params: { userId: number },
    path: string,
    url: string
};

declare type Location = {
    hash: string,
    key: string,
    pathname: string,
    search: string,
    state: State
};

declare type HarvestUser = {
    firstName: string,
    lastName: string,
    overtime: number,
    email: string,
    telephone: string,
    timezone: string,
    hasAccessToAllFutureProjects: boolean,
    contractor: boolean,
    admin: boolean,
    projectManager: boolean,
    active: boolean,
    avatarUrl: string,
    id: number,
    is_active: boolean
};

declare type Interceptor = {
    response: Function
};

declare type HarvestProject = {
    id: number,
    client: Object,
    name: string,
    isActive: boolean,
    project: Object
};
