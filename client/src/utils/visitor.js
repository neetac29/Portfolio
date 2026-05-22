import api from './api';

const VISITOR_ID_KEY = 'portfolioVisitorId';
const VISITOR_NAME_KEY = 'portfolioVisitorName';

export const getVisitorId = () => {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
};

export const trackVisit = async () => {
  try {
    const visitorId = getVisitorId();
    const name = localStorage.getItem(VISITOR_NAME_KEY) || '';

    await api.post('/visitor/track', {
      visitorId,
      name,
    });
  } catch (error) {
    console.warn('Visit not tracked:', error?.response?.data?.msg || error.message);
  }
};

export const saveVisitorName = async (name) => {
  localStorage.setItem(VISITOR_NAME_KEY, name);
  await api.post('/visitor/track', {
    visitorId: getVisitorId(),
    name,
  });
};