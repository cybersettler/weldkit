/**
 * RestService implementation for web applications
 * @type {RestServiceInterface}
 */
let RestService = {
  /**
   * Sends a GET request
   * @param {string} url
   * @param {object} [config]
   * @return {Promise<Response>}
   */
  getRepresentation: function(url, config) {
    let request = new Request(url);
    return fetch(request, config);
  },
  postRepresentation: function(url, data, config) {
    config = config || {
      method: 'POST',
      body: data,
    };
    let request = new Request(url);
    return fetch(request, config);
  },
  putRepresentation: function(url, data, config) {
    config = config || {
      method: 'PUT',
      body: data,
    };
    let request = new Request(url);
    return fetch(request, config);
  },
  patchRepresentation: function(url, data, config) {
    // TODO: implement patch
    config = config || {
      method: 'PUT',
      body: data,
    };
    let request = new Request(url);
    return fetch(request, config);
  },
  deleteRepresentation: function(url, config) {
    config = config || {
      method: 'DELETE',
      body: data,
    };
    let request = new Request(url);
    return fetch(request, config);
  },
};

export default RestService;