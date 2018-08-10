// @flow
import moment from 'moment';

export const TOTAL_OVERTIME = 'TOTAL_OVERTIME';

export const calculateOvertime = (totalOvertime: number): Action => ({
  type: TOTAL_OVERTIME,
  payload: totalOvertime
});

export const calculateTotalOvertime = (overtimeJSON: OvertimeType) => (
  dispatch: Dispatch,
  getState: GetState
) => {
  let totalOvertime = 0;

  Object.entries(overtimeJSON.loggedTimesYearMonth).map(
    (loggedTime: any, i) =>
      (totalOvertime += moment
        .duration(
          loggedTime[1].actualTime - loggedTime[1].targetTime,
          'seconds'
        )
        .asHours())
  );

  return dispatch(calculateOvertime(totalOvertime));
};
