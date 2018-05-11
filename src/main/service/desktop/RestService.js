/**
 * Backend service module.
 * @module frontend/service/BackendService
 */

const ipc = require('electron').ipcRenderer;
const shortid = require('shortid');

let requests = {};

ipc.on('response', function(e, response) {
  let request = requests[response.request.token];
  if (request) {
    request.fulfill(response);
    delete requests[response.request.token];
  }
});

/**
 * RestService implementation for Desktop applications
 * @type {RestServiceInterface}
 */
let RestService = {
  navigate: function(ref) {
    return new Promise(function(fulfill, reject) {
      let token = shortid.generate();
      requests[token] = {fulfill: fulfill, reject: reject};
      ipc.send('navigate', {ref: ref, token: token});
    });
  },
  getRepresentation: function(ref) {
    return new Promise(function(fulfill, reject) {
      let token = shortid.generate();
      requests[token] = {fulfill: fulfill, reject: reject};
      ipc.send('get', {ref: ref, token: token});
    });
  },
  postRepresentation: function(ref, data) {
    return new Promise(function(fulfill, reject) {
      let token = shortid.generate();
      requests[token] = {fulfill: fulfill, reject: reject};
      ipc.send('post', {ref: ref, data: data, token: token});
    });
  },
  putRepresentation: function(ref, data) {
    return new Promise(function(fulfill, reject) {
      let token = shortid.generate();
      requests[token] = {fulfill: fulfill, reject: reject};
      ipc.send('put', {ref: ref, data: data, token: token});
    });
  },
  patchRepresentation: function(ref, data) {
    return new Promise(function(fulfill, reject) {
      let token = shortid.generate();
      requests[token] = {fulfill: fulfill, reject: reject};
      ipc.send('patch', {ref: ref, data: data, token: token});
    });
  },
  deleteRepresentation: function(ref) {
    return new Promise(function(fulfill, reject) {
      let token = shortid.generate();
      requests[token] = {fulfill: fulfill, reject: reject};
      ipc.send('delete', {ref: ref, token: token});
    });
  },
};

export default RestService;
