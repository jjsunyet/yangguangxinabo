import Mock from 'mockjs'
import data from './involved-info.json'
import schedule from './schedulev2.json'

// Mock.mock('/involvedinfo', {code:0, data});
// Mock.mock('/involvedincaseinfo', {code:0, data});
// Mock.mock('/involvedincasecauseinfo', {code:0, data});

Mock.mock('/complaintsschedule',{code:0,schedule})

