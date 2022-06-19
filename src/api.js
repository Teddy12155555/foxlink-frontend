import axios from 'axios';

const baseRequest = axios.create({
	baseURL: 'http://140.118.157.9:8080',
  headers: {"Access-Control-Allow-Origin": "*"},
});


export const apiUserLogin = (data) => baseRequest.post('/auth/token', data, {
    headers:
    {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
export const apiUserLevel = (token) => baseRequest.get('/users/info', {
    headers : {
        'accept': 'application/json',
        'Authorization' : `Bearer ${token}`
    }
});

export const apiStatistics = (data) => baseRequest.get('/stats', {
  headers:
    {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

});

export const apiWorkStatus = (data) => baseRequest.get('/stats/worker-status', {
  headers:
    {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

});

// List
export const apiWorkShopList = (token) => baseRequest.get('/workshop/list', {
  headers : {
      'accept': 'application/json',
      'Authorization' : `Bearer ${token}`
  }
});
export const apiProjectList = (data) => baseRequest.get(`workshop/${data['workshopname']}/projects`, {
  headers : {
    'accept': 'application/json',
    'Authorization' : `Bearer ${data['token']}`
}
});


export const apiQRCode = (data) => baseRequest.get(`/workshop/qrcode?workshop_name=${data['name']}`, {
  headers:
    {
        'accept': 'application/x-zip-compressed',
        'Authorization' : `Bearer ${data['token']}`
    },
    responseType : 'blob'
});

export const apiMapGet = (data) => baseRequest.get(`/workshop/${data['name']}/image`, {
  headers:
    {
        'accept': 'application/json',
        'Authorization' : `Bearer ${data['token']}`
    },
    responseType : 'arraybuffer'
});
export const apiMapPost = (data) => baseRequest.post(`/workshop/${data['name']}/image`, data['file'], {
  headers:
    {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : `Bearer ${data['token']}`
    }
})

export const apiEventbook = (data) => baseRequest.post('/migration/workshop-eventbook', data['file'], {
  headers:
  {
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'accept': 'application/json',
    'Authorization' : `Bearer ${data['token']}`
  }
});
export const apiEventbookGet = (data) => baseRequest.get(`/device/category-priority?workshop_name=${data['workshop']}&project=${data['project']}`,{
  headers:
    {
        'accept': 'application/json',
        'Authorization' : `Bearer ${data['token']}`
    },
});

export const apiDevices = (data) => baseRequest.post('/migration/devices', data['file'], {
  headers:
  {
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'accept': 'application/json',
    'Authorization' : `Bearer ${data['token']}`
  }
});
export const apiDevicesData = (data) =>  baseRequest.get(`/device/?workshop_name=${data['name']}`, {
  headers:
    {
        'accept': 'application/json',
        'Authorization' : `Bearer ${data['token']}`
    }
});

export const apiWorkerinfos = (data) => baseRequest.post('/migration/factory-worker-infos', data['file'], {
  headers:
  {
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'accept': 'application/json',
    'Authorization' : `Bearer ${data['token']}`
  }
});
export const apiWorkerAll = (data) => baseRequest.get('/users/overview', 
{
  headers:
    {
        'accept': 'application/json',
        'Authorization' : `Bearer ${data['token']}`
    }
})

