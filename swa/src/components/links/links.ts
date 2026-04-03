export interface RigSyncLink {
  to: string
  title: string
  isReturn?: boolean
}

export const returnHomeLink: RigSyncLink = {
  to: '/',
  title: 'Return to homepage',
  isReturn: true,
};

export const returnToAADsLink: RigSyncLink = {
  to: '/aads',
  title: 'Return to AADs',
  isReturn: true,
};

export const returnToContainersLink: RigSyncLink = {
  to: '/containers',
  title: 'Return to containers',
  isReturn: true,
};

export const returnToMainCanopiesLink: RigSyncLink = {
  to: '/main-canopies',
  title: 'Return to main canopies',
  isReturn: true,
};

export const returnToReserveCanopiesLink: RigSyncLink = {
  to: '/reserve-canopies',
  title: 'Return to reserve canopies',
  isReturn: true,
};
