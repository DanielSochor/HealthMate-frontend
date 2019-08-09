//import axios from 'axios';
//import Pubsub from './pubsub';
//import Auth, { user } from './auth';
//import { API, NOTIF } from './constantsS';
//import { shallowCopyObj, orderByTimestamp, removeChannelsMemberOf } from './helper';

// import io from 'socket.io-client';

var Data = {};

// var AllChannels = {};
// var Channels = {};
// var CurrentChannelMessages = {};
// var Users = {};
// var AllUsers = {};

(function (obj) {

  // SOCKET IO TEST
  //let socket;

//   obj.connectSocket = (userId) => {
//     if (userId) {
//       socket = io();
//       let params = {
//         user_id: userId
//       };
//       console.log(socket);
//       socket.emit('join', params);

//       socket.on('newMessage', (message_id) => {
//         console.log('received newMessage emit');
//         Pubsub.publish(NOTIF.MESSAGES_RECEIVED, message_id);
//       });
//     } else {
//       console.log('userId undefined');
//       console.log(userId);
//     }
//   }

//   obj.changeSocketRoom = (channelId) => {
//     socket.emit('switchRoom', channelId);
//   }

//   obj.emitSocketMessage = (messageId) => {
//     console.log(socket);
//     socket.emit('sendMessage', messageId);
//   }

//   obj.getAllChannels = () => {
//     if (user.user_id) {
//       axios.get(API.getAllChannels).then(response => {
//         console.log('get all channels resolved');
//         console.log(response.data);
//         AllChannels = JSON.parse(JSON.stringify(response.data));
//         AllChannels = removeChannelsMemberOf(AllChannels, user.channels_member_of ? user.channels_member_of : []);
//         Pubsub.publish(NOTIF.GROUPS_DOWNLOADED, AllChannels);
//       }).catch(error => {
//         console.log(error);
//         // @TODO send helpful error back to user
//       });
//     }
//   }

//   obj.getAllUsers = () => {
//     if (user.user_id) {
//       axios.get(API.getAllUsers).then(response => {
//         console.log('get all users resolved');
//         console.log(response.data.data);
//         AllUsers = JSON.parse(JSON.stringify(response.data.data));
//         Pubsub.publish(NOTIF.DIRECT_MESSAGE_USERS_DOWNLOADED, AllUsers);
//       }).catch(error => {
//         console.log(error);
//         // @TODO send helpful error back to user
//       });
//     }
//   }

//   obj.getChannelById = (params) => {
//     axios.get(API.getAllChannels + params.channel_id).then(response => {
//       console.log('get channel by Id resolved');
//       console.log(response);
//     }).catch(error => {
//       console.log(error);
//       // @TODO send helpful error back to user
//     });
//   }

  // @TODO make post requests more DRY
//   obj.createChannel = (params) => {
//     return new Promise((resolve, reject) => {
//       axios.post(API.createChannel, {
//         channel_name: params.channel_name
//       }).then(response => {
//         // @TODO add new channel to channels, or overwrite?
//         console.log('create channel resolved');
//         console.log(response);
//         Pubsub.publish(NOTIF.GROUP_SELECTED, 'channel_' + response.data.channel_id);
//         resolve(response.data);
//       }).catch(error => {
//         console.log(error);
//         let errorObj = {
//           message: 'Error creating channel, please try again'
//         };
//         Pubsub.publish(NOTIF.CHANNEL_ERROR, errorObj);
//         reject();
//         // @TODO send helpful error back to user
//       });
//     });
    
//   }

  // @TODO create function for axios.delete channel

//   obj.joinChannel = (params) => {
//     axios.post(API.join, {
//       channel_id: params.channel_id,
//       users: params.users
//     }).then(response => {
//       // @TODO add new channel to channels, or overwrite?
//       Pubsub.publish(NOTIF.CHANNEL_JOIN, null);
//       Pubsub.publish(NOTIF.GROUP_MODAL_TOGGLE, null);
//     }).catch(error => {
//       console.log(error);
//       let errorObj = {
//         message: 'Error joining channel, please try again'
//       };
//       Pubsub.publish(NOTIF.CHANNEL_ERROR, errorObj);
//       // @TODO send helpful error back to user
//     });
//   }

//   obj.createDirectMessage = (params) => {
//     return new Promise((resolve, reject) => {
//       axios.post(API.createDirectMessage, {
//         direct_group_id: params.direct_group_id
//       }).then(response => {
//         // @TODO add new channel to channels, or overwrite?
//         console.log('create direct message resolved');
//         console.log(response);
//         resolve(response.data);
//       }).catch(error => {
//         console.log(error);
//         reject();
//         // @TODO send helpful error back to user
//       });
//     });
//   }

//   obj.sendDirectMessage = (params) => {
//     let messageObj = {
//       user_id: user.user_id,
//       message_text: params.message_text,
//       channel_id: params.direct_group_id
//     };
//     return new Promise((resolve, reject) => {
//       axios.post(API.sendMessage, messageObj).then(response => {
//         // @TODO add message to currentMessages and publish a notification
//         console.log(response);
//         resolve(response.data.insertId);
//       }).catch(error => {
//         console.log(error);
//         reject(error);
//         // @TODO send helpful error back to user
//       });
//     })
//   }

//   obj.sendMessage = (params) => {
//     let messageObj = {
//       user_id: user.user_id,
//       message_text: params.message_text,
//       channel_id: params.channel_id
//     };
//     return new Promise((resolve, reject) => {
//       axios.post(API.sendMessage, messageObj).then(response => {
//         // @TODO add message to currentMessages and publish a notification
//         console.log(response);
//         resolve(response.data.insertId);
//       }).catch(error => {
//         console.log(error);
//         reject(error);
//         // @TODO send helpful error back to user
//       });
//     })
//   }

  // Shouldn't be called by anything
//   obj.fetchMessages = (channelId) => {
//     axios.get(API.getMessages).then(response => {
//       // set CurrentChannelMessages with response info
//       console.log(response);
//       CurrentChannelMessages = JSON.parse(JSON.stringify(response.data));
//       Pubsub.publish(NOTIF.MESSAGES_RECEIVED, null);
//     }).catch(error => {
//       console.log(error);
//       // @TODO send helpful error back to user
//     });
//   }

  // @TODO send auth token with get request
//   obj.getChannelMessages = (channelId) => {
//     axios.get(API.getMessagesByChannelId + channelId).then(response => {
//       CurrentChannelMessages = orderByTimestamp(JSON.parse(JSON.stringify(response.data)));
//       Pubsub.publish(NOTIF.MESSAGES_RECEIVED, null);
//     }).catch(error => {
//       console.log(error);
//       // @TODO send helpful error back to user
//     })
//   }

//   obj.fetchMessageById = (messageId) => {
//     return new Promise((resolve, reject) => {
//       axios.get(API.getMessageById + messageId).then(response => {
//         console.log(response);
//         resolve(response.data);
//       }).catch(error => {
//         console.log(error);
//         reject(error);
//       });
//     });
//   }

  obj.handleSignout = () => {
    // AllChannels = {};
    // Channels = {};
    // CurrentChannelMessages = {};
    // Users = {};
  }
})(Data);

export default Data;

// export {
//   AllChannels,
//   Channels,
//   CurrentChannelMessages,
//   Users
// };