// @flow
import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
type Props = {
  monthEntry: Object
};

const MonthEntry = ({ monthEntry }: Props) => {
  return (
    <div>
      <div>
        {moment.duration(monthEntry.actualTime, 'seconds').asHours()}/{moment
          .duration(monthEntry.targetTime, 'seconds')
          .asHours()}{' '}
        <FormattedMessage id="timecard.hours" />
      </div>
    </div>
  );
};

export default MonthEntry;
