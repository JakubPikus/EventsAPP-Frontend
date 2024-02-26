import {
  WEBSOCKETS_CONTACT_STATE_CHANGE,
  WEBSOCKETS_CONNECT_SUCCESS,
  WEBSOCKETS_CONNECT_FAIL,
  WEBSOCKETS_DISCONNECTED,
  WEBSOCKETS_FRIENDS_LIST_SUCCESS,
  WEBSOCKETS_FRIENDS_LIST_FAIL,
  WEBSOCKETS_FRIENDS_LIST_NEXT_SUCCESS,
  WEBSOCKETS_FRIENDS_LIST_NEXT_FAIL,
  WEBSOCKETS_MESSAGES_LIST_SUCCESS,
  WEBSOCKETS_MESSAGES_LIST_FAIL,
  WEBSOCKETS_MESSAGES_LIST_NEXT_SUCCESS,
  WEBSOCKETS_MESSAGES_LIST_NEXT_FAIL,
  WEBSOCKETS_CHAT_OPEN,
  WEBSOCKETS_CHAT_CLOSE,
  WEBSOCKETS_CONVERSATION_SUCCESS,
  WEBSOCKETS_CONVERSATION_FAIL,
  WEBSOCKETS_SEND_MESSAGE_SUCCESS,
  WEBSOCKETS_SEND_MESSAGE_FAIL,
  WEBSOCKETS_SENDING_MESSAGE_SUCCESS,
  WEBSOCKETS_SENDING_MESSAGE_FAIL,
  WEBSOCKETS_RECEIVE_MESSAGE_SUCCESS,
  WEBSOCKETS_RECEIVE_MESSAGE_FAIL,
  WEBSOCKETS_MESSAGES_DELIVERED,
  WEBSOCKETS_ONLINE_FRIENDS_SUCCESS,
  WEBSOCKETS_FILTER_REMOVE_FRIEND_LIST,
  WEBSOCKETS_FILTER_ADD_FRIEND_LIST,
  WEBSOCKETS_CLEAR_REDUCER,
  WEBSOCKETS_CATCH_BLOCKED_STATUS,
  WEBSOCKETS_CATCH_UNBLOCKED_STATUS,
  WEBSOCKETS_CATCH_DELETED_USER,
  WEBSOCKETS_INVITATIONS_LIST_NEXT_SUCCESS,
  WEBSOCKETS_INVITATIONS_LIST_NEXT_FAIL,
  WEBSOCKETS_INVITATIONS_STATE_CHANGE,
  WEBSOCKETS_INVITATION_REMOVE,
  WEBSOCKETS_GET_INVITE_SUCCESS,
  WEBSOCKETS_FIND_USER_BY_ID_SUCCESS,
  WEBSOCKETS_FIND_USER_BY_ID_FAIL,
  WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_SUCCESS,
  WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_FAIL,
  WEBSOCKETS_NOTIFICATIONS_LIST_SUCCESS,
  WEBSOCKETS_NOTIFICATIONS_LIST_FAIL,
  WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_SUCCESS,
  WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_FAIL,
  WEBSOCKETS_GET_NOTIFICATION_SUCCESS,
  WEBSOCKETS_SEEN_NOTIFICATIONS_FAIL,
} from "../actions/types";

const initialState = {
  isConnected: false,
  socket: null,
  handler: {
    error: "",
    success: "",
    type: "",
    code: "",
  },
  wrapper_status: {
    status: false,
    content: null,
    show_invitations: true,
  },
  chat_settings: [],
  online_friends: [],
};

const websocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEBSOCKETS_CONNECT_SUCCESS:
      return {
        ...state,
        isConnected: true,
        socket: action.data,
      };

    case WEBSOCKETS_CONNECT_FAIL:
      return {
        ...state,
        isConnected: false,
        socket: null,
      };

    case WEBSOCKETS_DISCONNECTED:
      return {
        ...state,
        isConnected: false,
        socket: null,
        online_friends: [],
      };

    case WEBSOCKETS_INVITATIONS_STATE_CHANGE:
      return {
        ...state,
        wrapper_status: {
          ...state.wrapper_status,
          show_invitations: !state.wrapper_status.show_invitations,
        },
      };

    case WEBSOCKETS_CONTACT_STATE_CHANGE:
      let off_messages_reduce = state.messages;
      let off_friends_reduce = state.friends;
      let off_notifications_reduce = state.notifications;
      let new_status;
      let new_content;

      if (state.wrapper_status.status == false) {
        // PRZYPADEK GDY BYŁ WYŁĄCZONY I WŁĄCZAMY

        new_status = true;
        new_content = action.content;
      } else if (
        action.content == state.wrapper_status.content || // PRZYPADEK GDY WYŁĄCZAMY LUB KLIKAMY NA TO SAMO DO WYŁĄCZENIA
        action.content == "off"
      ) {
        new_status = false;
        new_content = null;

        if (
          off_messages_reduce?.data !== undefined &&
          off_friends_reduce?.data !== undefined &&
          off_notifications_reduce?.data !== undefined
        ) {
          off_messages_reduce.data = off_messages_reduce.data.slice(0, 14);
          off_messages_reduce.meta.excluded_ids =
            off_messages_reduce.meta.excluded_ids.slice(0, 14);
          off_messages_reduce.meta.end_pagination = false;

          off_friends_reduce.data = off_friends_reduce.data.slice(0, 14);
          off_friends_reduce.meta.excluded_ids =
            off_friends_reduce.meta.excluded_ids.slice(0, 14);
          off_friends_reduce.meta.end_pagination = false;

          off_friends_reduce.meta.invitations.data =
            off_friends_reduce.meta.invitations.data.slice(0, 5);
          off_friends_reduce.meta.invitations.meta.excluded_ids =
            off_friends_reduce.meta.invitations.meta.excluded_ids.slice(0, 5);
          off_friends_reduce.meta.invitations.meta.end_pagination = false;

          off_notifications_reduce.data = off_notifications_reduce.data.slice(
            0,
            14
          );

          if (off_notifications_reduce.data.length > 0) {
            off_notifications_reduce.meta.cursor_date =
              off_notifications_reduce.data[
                off_notifications_reduce.data.length - 1
              ].created_at;
          } else {
            off_notifications_reduce.meta.cursor_date = "";
          }

          off_notifications_reduce.meta.end_pagination = false;
          off_notifications_reduce.meta.new_count = 0;
        }
      } else {
        new_status = true;
        new_content = action.content;

        if (
          off_messages_reduce?.data !== undefined &&
          off_friends_reduce?.data !== undefined &&
          off_notifications_reduce?.data !== undefined
        ) {
          if (action.content == "messages") {
            off_friends_reduce.data = off_friends_reduce.data.slice(0, 14);
            off_friends_reduce.meta.excluded_ids =
              off_friends_reduce.meta.excluded_ids.slice(0, 14);
            off_friends_reduce.meta.end_pagination = false;

            off_friends_reduce.meta.invitations.data =
              off_friends_reduce.meta.invitations.data.slice(0, 5);
            off_friends_reduce.meta.invitations.meta.excluded_ids =
              off_friends_reduce.meta.invitations.meta.excluded_ids.slice(0, 5);
            off_friends_reduce.meta.invitations.meta.end_pagination = false;
          } else if (action.content == "notifications") {
            off_notifications_reduce.data = off_notifications_reduce.data.slice(
              0,
              14
            );

            if (off_notifications_reduce.data.length > 0) {
              off_notifications_reduce.meta.cursor_date =
                off_notifications_reduce.data[
                  off_notifications_reduce.data.length - 1
                ].created_at;
            } else {
              off_notifications_reduce.meta.cursor_date = "";
            }

            off_notifications_reduce.meta.end_pagination = false;
          } else {
            off_messages_reduce.data = off_messages_reduce.data.slice(0, 14);
            off_messages_reduce.meta.excluded_ids =
              off_messages_reduce.meta.excluded_ids.slice(0, 14);
            off_messages_reduce.meta.end_pagination = false;
          }
        }
      }

      return {
        ...state,
        wrapper_status: {
          ...state.wrapper_status,
          status: new_status,
          content: new_content,
        },
        friends: off_friends_reduce,
        messages: off_messages_reduce,
        notifications: off_notifications_reduce,
      };

    case WEBSOCKETS_FRIENDS_LIST_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "friends_list",
          code: action.code,
        },
        friends: {
          data: action.data,
          meta: action.meta,
        },
      };

    case WEBSOCKETS_FRIENDS_LIST_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "friends_list",
          code: action.code,
        },
      };

    case WEBSOCKETS_FRIENDS_LIST_NEXT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "friends_list_next",
          code: action.code,
        },
        friends: {
          data: [...state.friends.data, ...action.data],
          meta: {
            ...state.friends.meta,
            excluded_ids: [
              ...state.friends.meta.excluded_ids,
              ...action.meta.excluded_ids,
            ],
            end_pagination: action.meta.end_pagination,
          },
        },
      };

    case WEBSOCKETS_FRIENDS_LIST_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "friends_list_next",
          code: action.code,
        },
      };

    case WEBSOCKETS_MESSAGES_LIST_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "messages_list",
          code: action.code,
        },
        messages: {
          data: action.data,
          meta: action.meta,
        },
      };

    case WEBSOCKETS_MESSAGES_LIST_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "messages_list",
          code: action.code,
        },
      };

    case WEBSOCKETS_MESSAGES_LIST_NEXT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "messages_list_next",
          code: action.code,
        },
        messages: {
          data: [...state.messages.data, ...action.data],
          meta: {
            ...state.messages.meta,
            excluded_ids: [
              ...state.messages.meta.excluded_ids,
              ...action.meta.excluded_ids,
            ],
            end_pagination: action.meta.end_pagination,
          },
        },
      };

    case WEBSOCKETS_MESSAGES_LIST_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "messages_list_next",
          code: action.code,
        },
      };

    case WEBSOCKETS_CHAT_OPEN:
      let chat_open_state = state.chat_settings;

      // OTWIERAMY CHAT I DAJEMU MU FLAGĘ "WAS_OPENED=FALSE" DO WYWOŁANIA POBRANIA HISTORII KORESPONDENCJI

      //

      // GDY BYŁ TO NASZ 1 WSZY WŁĄCZANY CHAT, POPROSTU DOPISZ Z FLAGĄ
      //
      // GDY MIELIŚMY INNY WŁĄCZONY CHAT, ZMIEŃ KOLEJNOŚĆ
      //
      // GDY JUŻ NASZ CHAT BYŁ WŁĄCZONY I PONOWNIE CHCEMY GO OTWORZYĆ, TO NIE POBIERAJ HISTORII WIADOMOŚĆI, JEDYNIE ZMIEŃ KOLEJNOŚĆ

      if (chat_open_state.length > 0) {
        let object_already = chat_open_state.find(
          (chat) => chat.id == action.data.id
        );

        if (object_already) {
          let old_chat_settings = chat_open_state.filter(
            (chat) => chat.id != action.data.id
          );

          return {
            ...state,
            chat_settings: [object_already, ...old_chat_settings],
          };
        } else {
          return {
            ...state,
            chat_settings: [
              {
                ...action.data,
                was_opened: false,
              },
              ...chat_open_state,
            ],
          };
        }
      } else {
        return {
          ...state,
          chat_settings: [
            {
              ...action.data,
              was_opened: false,
            },
          ],
        };
      }

    case WEBSOCKETS_CHAT_CLOSE:
      let chat_close_state = state.chat_settings;

      chat_close_state = chat_close_state.filter(
        (chat) => chat.id != action.id
      );

      return {
        ...state,
        chat_settings: chat_close_state,
      };

    case WEBSOCKETS_CONVERSATION_SUCCESS:
      let load_conversation = [...state.chat_settings];
      let remove_unreaded_messages = state.messages;

      // ZNAJDUMEMY NASZ OTWARTY CHAT I ZMIENIAMY MU FLAGĘ, ABY POINFORMOWAĆ ŻE DANE ZOSTAŁY JUŻ ZAŁADOWANE

      let user_conversation = load_conversation.find(
        (user) => user.id == action.target_user_id
      );

      user_conversation.was_opened = true;

      /////********************                 TRZEBA DOPISAC WARUNEK JESLI KTOS NAS ZABLOKOWAL A BYLO FALSE A JEST TRUE TO MUSIMY GO USUNAC Z FRIENDSLIST WEBSOCKET JEZELI GO POBRALISMY*/
      ///// GDY MY KOGOS BLOKUJEMY TO WYWOLUJE SIE TO Z INNEGO MIEJSCA

      //// NIE DO KONCA BO PRZECIEZ KTOS MOZE ZABLOKOWAC TARGETUSER Z INNEGO URZADZENIA !!!!!
      user_conversation.blocked_by_target_user =
        action.meta.status_blocked_by_target_user;

      user_conversation.block_target_user =
        action.meta.status_your_block_target_user;

      // DOPISZ WIADOMOŚĆI

      if (user_conversation.messages !== undefined) {
        user_conversation.messages = {
          ...action.data,
          data: [...user_conversation.messages.data, ...action.data.data],
        };
      } else {
        user_conversation.messages = action.data;
      }

      // PO POBRANIU WIADOMOŚCI, ODZNACZAMY W BANKU ILOŚĆ NIEPRZECZYTANYCH WIADOMOŚCI OD TEGO UŻYTKOWNIKA

      if (
        remove_unreaded_messages?.meta.new_messages.users.hasOwnProperty(
          user_conversation.id
        )
      ) {
        remove_unreaded_messages.meta.new_messages.count -=
          remove_unreaded_messages.meta.new_messages.users[
            user_conversation.id
          ];
        delete remove_unreaded_messages.meta.new_messages.users[
          user_conversation.id
        ];
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "user_conversation",
          code: action.code,
        },
        chat_settings: load_conversation,
        messages: remove_unreaded_messages,
      };

    case WEBSOCKETS_CONVERSATION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "user_conversation",
          code: action.code,
        },
      };

    case WEBSOCKETS_SENDING_MESSAGE_SUCCESS:
      let add_message_localy = state.chat_settings;

      // ZNAJDUJEMY NASZ OTWARTY CHAT Z TYCH OTWARTYCH ORAZ PRZYPISUJEMY "LOKALNIE" NOWĄ WIADOMOŚĆ ZE STANEM TYMCZASOWYM

      let find_room_user = add_message_localy.find(
        (user) => user.id == action.data.recipient_id
      );

      let message = {
        author: action.author,
        status: "is_sending",
        content: action.data.content,
        temp_message_id: action.data.temp_message_id,
      };

      find_room_user.messages.data = [message, ...find_room_user.messages.data];

      return {
        ...state,
        chat_settings: add_message_localy,
      };

    case WEBSOCKETS_SEND_MESSAGE_SUCCESS:
      let message_status_send = [...state.chat_settings];
      let last_message_change_order = state.messages;
      let change_friend_status_after_send_recognize = state.friends;

      /////// POMYŚLNY PRZYPADEK WYSŁANIA WIADOMOŚCI I ODEBRANIA POTWIERDZENIA OD WEBSOCKETU O POMYŚLNYM UTWORZENIU MODELU

      // ZMIANA STATUSU WIADOMOSCI ORAZ PRZYPISANIE MU FAKTYCZNEGO "ID" Z BAZY

      let find_room_user_send = message_status_send.find(
        (user) => user.id == action.data.user.id
      );

      // GDY OTRZYMUJEMY POTWIERDZENIE O WYSLANIU WIADOMOSCI

      // GDY ZNAJDUJEMY OTWARTE OKNO TO WPROWADZAMY ZMIANY
      if (find_room_user_send) {
        find_room_user_send.is_friend = action.data.user.is_friend;

        let find_message_author_send = find_room_user_send.messages.data.find(
          (message) => message.temp_message_id == action.data.temp_message_id
        );

        // JESLI JESTESMY AUTOREM TEJ WIADOMOSCI, TO ZMIENIAMY JEGO STATUS, PRZYPISUJEMY ID I DATE UTWORZENIA

        // JESLI NIE JESTESMY AUTOREM, CZYLI KTOS INNY Z NASZEGO KONTA WYSLAL WIADOMOSC, PRZYPISUJEMY JĄ JAKO NOWĄ

        if (find_message_author_send) {
          find_message_author_send.status = action.data.message.status;
          find_message_author_send.message_id = action.data.message.message_id;
          find_message_author_send.timestamp = action.data.message.timestamp;
        } else {
          find_room_user_send.messages.data = [
            {
              ...action.data.message,
              message_id: parseInt(action.data.message.message_id),
            },
            ...find_room_user_send.messages.data,
          ];
        }
      }

      // ZMIANA KOLEJNOSCI NAJNOWSZEJ WIADOMOSCI W ZAKLADCE "WIADOMOSCI"
      let find_last_message_change_order = last_message_change_order?.data.find(
        (user) => user.id == action.data.user.id
      );

      ///// JESLI W NASZYCH OSTATNICH KONWERSACJACH ZNAJDUJE SIĘ NASZ ODBIORCA, TO:
      // - PODMIENIAMY OSTATNIĄ WIADOMOŚĆ NA TĄ NASZĄ WYSŁANĄ
      // - ZMIENIAMY KOLEJNOSC OSTATNICH WIADOMOSCI
      // - ZMIENIAMY KOLEJNOSC EXCLUDE IDS (PO TO, BO PO WYŁĄCZENIU OKNA Z CHATEM, ZOSTAWIAMY TYLKO 14 PIERWSZYCH OBIEKTOW ABY NIE PRZECIAZYC)

      if (find_last_message_change_order) {
        // PODMIANA OSTATNIEJ WIADOMOSCI ORAZ STATUSU ZNAJOMEGO

        find_last_message_change_order.messages.data[0] = {
          ...action.data.message,
          message_id: parseInt(action.data.message.message_id),
        };
        find_last_message_change_order.is_friend = action.data.user.is_friend;

        // ODFILTROWANA LISTA BEZ NASZEGO CHATU

        let old_last_message_change_order =
          last_message_change_order.data.filter(
            (user) => user.id != find_last_message_change_order.id
          );

        // ODFILTROWANA LISTA EXCLUDE_IDS

        let old_exclude_ids_change_order =
          last_message_change_order.meta.excluded_ids.filter(
            (user) => user != find_last_message_change_order.id
          );

        // PRZYPISUJEMY NOWE WARTOSCI

        last_message_change_order = {
          data: [
            find_last_message_change_order,
            ...old_last_message_change_order,
          ],
          meta: {
            ...last_message_change_order.meta,
            excluded_ids: [
              find_last_message_change_order.id,
              ...old_exclude_ids_change_order,
            ],
          },
        };
      } else {
        // GDY NIE MA ODBIORCY TO:
        // - TWORZYMY NOWY OBIEKT KONWERSACJI I PRZYPISUJEMY NA POCZĄTEK LISTY "DATA"
        // - PRZYPISUJEMY WARTOSC ID NA POCZATEK LISTY EXCLUDEID
        let new_last_conversation = {
          ...action.data.user,
          image_thumbnail: "/media/" + action.data.user.image_thumbnail,
          id: parseInt(action.data.user.id),
          messages: {
            data: [action.data.message],
          },
        };

        // let new_last_conversation = {
        //   id: find_room_user_send.id,
        //   username: find_room_user_send.username,
        //   image_thumbnail: find_room_user_send.image_thumbnail,
        //   messages: {
        //     data: [find_message_author_send],
        //   },
        //   is_friend: action.data.is_friend,
        // };

        last_message_change_order = {
          data: [new_last_conversation, ...last_message_change_order.data],
          meta: {
            ...last_message_change_order.meta,
            excluded_ids: [
              new_last_conversation.id,
              ...last_message_change_order.meta.excluded_ids,
            ],
          },
        };
      }

      // GDY STAN ZNAJOMOSCI ZMIENI SIE NA "FALSE", A USER ZNAJDUJE SIE U NAS NA LISCIE ZNAJOMYCH

      // INNE PRZYPADKI MUSZĄ BYĆ ŁAPANE Z INNEGO MIEJSCA CZYLI:
      //
      // - GDY ODBIORCA NAS ZAAKCEPTUJE TO Z NOTIFICATION ZE ZAPROSZENIE ZAAKCEPTOWANE
      // - GDY MY KOGOS USUNIEMY TO Z DELETE_FRIEND JAK ZNAJDUJE SIE POBRANY NA LISCIE ZNAJOMYCH
      // - GDY MY KOGOS ZAAKCEPTUJEMY TO Z ACCEPT_FRIEND JAK END_PAGINATION=TRUE

      let send_find_change_status_friend =
        change_friend_status_after_send_recognize.data.find(
          (friend) => friend.id == action.data.user.id
        );

      if (send_find_change_status_friend && action.data.is_friend == false) {
        change_friend_status_after_send_recognize.data =
          change_friend_status_after_send_recognize.data.filter(
            (friend) => friend.id != action.data.user.id
          );

        change_friend_status_after_send_recognize.meta.excluded_ids =
          change_friend_status_after_send_recognize.meta.excluded_ids.filter(
            (exclude_id) => exclude_id != action.data.user.id
          );
      }

      return {
        ...state,
        chat_settings: message_status_send,
        messages: last_message_change_order,
        friends: change_friend_status_after_send_recognize,
      };

    case WEBSOCKETS_SEND_MESSAGE_FAIL:
      // GDY WYSTĄPI BŁĄD W WEBSOCKET I NIE DOSTANIEMY ZWROTU Z DJANGO O POMYSLNYM UTWORZENIU MODELU
      let add_message_localy_error = [...state.chat_settings];

      let find_room_user_error = add_message_localy_error.find(
        (user) => user.id == action.data.recipient_id
      );

      let find_notsend_message = find_room_user_error.messages.data.find(
        (message) => message.temp_message_id == action.data.temp_message_id
      );

      find_notsend_message.status = "not_send";
      find_notsend_message.error_details = "Nie połączono z websocketem";

      return {
        ...state,
        chat_settings: add_message_localy_error,
      };

    case WEBSOCKETS_RECEIVE_MESSAGE_SUCCESS:
      let message_status_receive = [...state.chat_settings];
      let last_message_change_order_received = state.messages;
      let change_friend_status_after_receive_recognize = state.friends;
      let append_online_friends = [...state.online_friends];

      let find_open_chat = message_status_receive.find(
        (user) => user.id == action.data.user.id
      );

      let find_last_conversation = last_message_change_order_received.data.find(
        (user) => user.id == action.data.user.id
      );

      ////////////////////////// USTAWIANIE OTWORZENIA CHATU I PRZYPISANIU NOWEJ WIADOMOSCI PO OTRZYMANIU WIADOMOSCI

      // JESLI CHAT BYL OTWARTY, DOPISZ WIADOMOSC ORAZ NADPISZ STATUS WASZEJ ZNAJOMOSCI
      if (find_open_chat) {
        find_open_chat.is_friend = action.data.user.is_friend;
        find_open_chat.blocked_by_target_user = false;
        find_open_chat.messages.data = [
          action.data.message,
          ...find_open_chat.messages.data,
        ];
      }
      // JESLI NIE TO OTWORZ NOWY CHAT Z NOWĄ WIADOMOSCIA
      else {
        // KOPIUJEMY Z BACKENDA ZWROCONE WARTOSCI "ID, USERNAME, IS_FRIEND, AVATAR"
        // TWORZYMY PUSTY OBIEKT "MESSAGES" DO PRZYPISYWANIA WIADOMOSCI ORAZ ROBIMY POLE DO KOLEJNEGO PRZYPISYWANIA FLAG PAGINACJI
        // PRZYPISUJEMY NASZĄ NOWĄ WIADOMOŚĆ DO "messages.data", ZWRÓCONĄ Z BACKENDU JAKO PIERWSZA
        // TWORZYMY FLAGĘ "was_opened = false" DO POBRANIA NOWYCH WIADOMOSCI
        // ZMIENIAMY NIECO LINK DO OBRAZKA

        let open_new_chat = { ...action.data.user };
        open_new_chat.messages = {};
        open_new_chat.messages.data = [action.data.message];
        open_new_chat.was_opened = false;
        open_new_chat.blocked_by_target_user = false;
        open_new_chat.block_target_user = false;

        open_new_chat.image_thumbnail =
          "/media/" + open_new_chat.image_thumbnail;
        open_new_chat.id = parseInt(open_new_chat.id);

        message_status_receive = [open_new_chat, ...message_status_receive];
      }

      ////////////////////////// AKTUALIZACJA WIADOMOSCI I KOLEJNOSCI W OSTATNICH KORESPONDENCJACH

      /// JESLI KONWERSACJA BYLA WCZESNIEJ POBRANA W WIADOMOSCIACH

      if (find_last_conversation) {
        find_last_conversation.messages.data[0] = action.data.message;
        find_last_conversation.is_friend = action.data.user.is_friend;
        find_last_conversation.blocked_by_target_user = false;

        let old_last_message_order_message_received =
          last_message_change_order_received.data.filter(
            (user) => user.id != find_last_conversation.id
          );

        let old_exclude_ids_order_message_received =
          last_message_change_order_received.meta.excluded_ids.filter(
            (user) => user != find_last_conversation.id
          );

        last_message_change_order_received = {
          data: [
            find_last_conversation,
            ...old_last_message_order_message_received,
          ],
          meta: {
            ...last_message_change_order_received.meta,
            excluded_ids: [
              find_last_conversation.id,
              ...old_exclude_ids_order_message_received,
            ],
          },
        };
      } else {
        // GDY NIE MA OSTATNIEJ KONWERSACJI TO:
        // - TWORZYMY NOWY OBIEKT KONWERSACJI I PRZYPISUJEMY NA POCZĄTEK LISTY "DATA"
        // - PRZYPISUJEMY WARTOSC ID NA POCZATEK LISTY EXCLUDEID

        let new_last_conversation_received = { ...action.data.user };
        new_last_conversation_received.messages = {};
        new_last_conversation_received.image_thumbnail =
          "/media/" + new_last_conversation_received.image_thumbnail;
        new_last_conversation_received.messages.data = [action.data.message];
        new_last_conversation_received.blocked_by_target_user = false;
        new_last_conversation_received.block_target_user = false;

        last_message_change_order_received = {
          data: [
            new_last_conversation_received,
            ...last_message_change_order_received.data,
          ],
          meta: {
            ...last_message_change_order_received.meta,
            excluded_ids: [
              new_last_conversation_received.id,
              ...last_message_change_order_received.meta.excluded_ids,
            ],
          },
        };
      }

      // GDY STAN ZNAJOMOSCI ZMIENI SIE NA "FALSE", A USER ZNAJDUJE SIE U NAS NA LISCIE ZNAJOMYCH

      let receive_find_change_status_friend =
        change_friend_status_after_receive_recognize.data.find(
          (friend) => friend.id == action.data.user.id
        );

      if (
        receive_find_change_status_friend &&
        action.data.user.is_friend == false
      ) {
        change_friend_status_after_receive_recognize.data =
          change_friend_status_after_receive_recognize.data.filter(
            (friend) => friend.id != action.data.user.id
          );

        change_friend_status_after_receive_recognize.meta.exclude_ids =
          change_friend_status_after_receive_recognize.meta.exclude_ids.filter(
            (exclude_id) => exclude_id != action.data.user.id
          );
      }

      // GDY DOSTAJEMY WIADOMOSC OD ZNAJOMEGO, KTORY PRZED OSTATNIM FETCHEM ONLINE_ZNAJOMYCH NIE BYŁO GO W NIM, TO DOPISUJEMY GO DO LISTY ONLINE_FRIENDS

      let int_id = parseInt(action.data.user.id);

      if (
        !append_online_friends.includes(int_id) &&
        action.data.user.is_friend == true
      ) {
        append_online_friends = [int_id, ...append_online_friends];
      }

      return {
        ...state,
        chat_settings: message_status_receive,
        messages: last_message_change_order_received,
        friends: change_friend_status_after_receive_recognize,
        online_friends: append_online_friends,
      };

    case WEBSOCKETS_MESSAGES_DELIVERED:
      // SYTUACJA GDY WYSLALISMY PEWNEMU USEROWI WIADOMOSC GDY BYL OFFLINE, ALE NAGLE ZALOGOWAL SIE ON I NASZE WYSLANE WIADOMOSCI ZOSTALY DOSTARCZONE DO NIEGO
      let chat_settings_set_delivered = [...state.chat_settings];
      let messages_set_delivered = [...state.messages.data];

      let find_chat_open_set_delivered = chat_settings_set_delivered.find(
        (chat) => chat.id == action.data.user
      );

      let find_messages_set_delivered = messages_set_delivered.find(
        (conversation) => conversation.id == action.data.user
      );

      // JESLI ZNAJDUJEMY NASZ OTWARTY CHAT, WSZYSTKIE NIEWYSLANE WIADOMOSCI PRZEZ NAS ZMIENIAJA STAN NA "DOSTARCZONE"

      if (find_chat_open_set_delivered) {
        find_chat_open_set_delivered.messages.data.forEach((message) => {
          if (
            message.author != action.data.user &&
            message.status == "is_send"
          ) {
            message.status = "is_delivered";
          }
        });
      }

      // JESLI ZNAJDUJEMY NASZĄ KONWERSACJĘ W LISCIE OSTATNICH ROZMOW, ROWNIEZ ZMIENIAMY OSTATNIA WIADOMOSC NA DOSTARCZONĄ

      if (find_messages_set_delivered) {
        find_messages_set_delivered.messages.data[0].status = "is_delivered";
      }

      return {
        ...state,
        chat_settings: chat_settings_set_delivered,
        messages: {
          ...state.messages,
          data: messages_set_delivered,
        },
      };

    case WEBSOCKETS_ONLINE_FRIENDS_SUCCESS:
      return {
        ...state,
        online_friends: action.data.online_friends,
      };

    case WEBSOCKETS_FILTER_REMOVE_FRIEND_LIST:
      let remove_friend_filtered_friends_list = state.friends;
      let remove_friend_filtered_messages_list = state.messages;
      let remove_friend_filtered_chat_list = state.chat_settings;

      remove_friend_filtered_friends_list.data =
        remove_friend_filtered_friends_list.data.filter(
          (friend) => friend.id != action.remove_user.id
        );
      remove_friend_filtered_friends_list.meta.excluded_ids =
        remove_friend_filtered_friends_list.meta.excluded_ids.filter(
          (excluded_id) => excluded_id != action.remove_user.id
        );

      ////******************************************* */

      let removal_friend_messages =
        remove_friend_filtered_messages_list.data.find(
          (friend) => friend.id == action.remove_user.id
        );

      if (removal_friend_messages) {
        removal_friend_messages.is_friend = false;
      }

      ////******************************************* */

      let removal_friend_chat = remove_friend_filtered_chat_list.find(
        (chat) => chat.id == action.remove_user.id
      );

      if (removal_friend_chat) {
        removal_friend_chat.is_friend = false;
      }

      ////******************************************* */

      return {
        ...state,
        friends: remove_friend_filtered_friends_list,
        messages: remove_friend_filtered_messages_list,
        chat_settings: remove_friend_filtered_chat_list,
      };

    case WEBSOCKETS_FILTER_ADD_FRIEND_LIST:
      let add_friend_filtered_friends_list = state.friends;
      let add_friend_filtered_messages_list = state.messages;
      let add_friend_filtered_chat_list = state.chat_settings;

      if (
        add_friend_filtered_friends_list.meta.end_pagination == true ||
        add_friend_filtered_friends_list.data.length == 0
      ) {
        add_friend_filtered_friends_list.data = [
          ...add_friend_filtered_friends_list.data,
          {
            ...action.add_user,
            image_thumbnail:
              action.stats == true
                ? action.add_user.image_thumbnail
                : "/media/" + action.add_user.image_thumbnail,
            is_friend: true,
          },
        ];

        add_friend_filtered_friends_list.meta.excluded_ids = [
          ...add_friend_filtered_friends_list.meta.excluded_ids,
          action.add_user.id,
        ];
      }

      ////******************************************* */

      let add_friend_messages = add_friend_filtered_messages_list.data.find(
        (friend) => friend.id == action.add_user.id
      );

      if (add_friend_messages) {
        add_friend_messages.is_friend = true;
      }

      ////******************************************* */

      let add_friend_chat = add_friend_filtered_chat_list.find(
        (chat) => chat.id == action.add_user.id
      );

      if (add_friend_chat) {
        add_friend_chat.is_friend = true;
      }

      return {
        ...state,
        friends: add_friend_filtered_friends_list,
        messages: add_friend_filtered_messages_list,
        chat_settings: add_friend_filtered_chat_list,
      };

    case WEBSOCKETS_CATCH_BLOCKED_STATUS:
      let add_message_localy_error_blocked = [...state.chat_settings];
      let change_flags_last_conversation = state.messages;
      let delete_from_friend_list = state.friends;

      // ZMIANA FLAG DLA USTAWIEŃ OKNA Z CHATEM ORAZ ZMIANA STATUSU WIADOMOSCI

      let find_room_user_error_blocked = add_message_localy_error_blocked.find(
        (user) => user.id == action.data.room_user_id
      );

      if (find_room_user_error_blocked) {
        find_room_user_error_blocked.is_friend = false;
        find_room_user_error_blocked.block_target_user =
          action.data.block_target_user;
        find_room_user_error_blocked.blocked_by_target_user =
          action.data.blocked_by_target_user;

        if (action.data.temp_message_id !== undefined) {
          let find_notsend_message_blocked =
            find_room_user_error_blocked.messages.data.find(
              (message) =>
                message.temp_message_id == action.data.temp_message_id
            );

          if (find_notsend_message_blocked) {
            if (action.data.block_target_user) {
              find_notsend_message_blocked.status = "not_send";
              find_notsend_message_blocked.error_details =
                "Zablokowałeś tego użytkownika";
            } else {
              find_notsend_message_blocked.status = "not_send";
              find_notsend_message_blocked.error_details =
                "Zostałeś zablokowany przez tego użytkownika";
            }
          }
        }
      }

      // ZMIANA FLAG DLA USTAWIEŃ OSTATNICH KONWERSACJI JESLI TAKOWĄ MAMY POBRANĄ

      let find_last_conversation_error_blocked =
        change_flags_last_conversation.data.find(
          (user) => user.id == action.data.room_user_id
        );

      if (find_last_conversation_error_blocked) {
        find_last_conversation_error_blocked.is_friend = false;
        find_last_conversation_error_blocked.block_target_user =
          action.data.block_target_user;
        find_last_conversation_error_blocked.blocked_by_target_user =
          action.data.blocked_by_target_user;
      }

      // USUNIECIE Z LISTY ZNAJOMYCH NASZEGO ROZMOWCE JESLI TAKOWEGO MAMY POBRANEGO

      let find_friend_error_blocked = delete_from_friend_list.data.find(
        (user) => user.id == action.data.room_user_id
      );

      if (find_friend_error_blocked) {
        delete_from_friend_list.data = delete_from_friend_list.data.filter(
          (user) => user.id != action.data.room_user_id
        );

        delete_from_friend_list.meta.excluded_ids =
          delete_from_friend_list.meta.excluded_ids.filter(
            (excluded_id) => excluded_id != action.data.room_user_id
          );
      }

      // USUNIECIE Z LISTY ZAPROSZEN JESLI NASZ USER NA NIEJ SIE ZNAJDUJE

      let find_invite_error_blocked =
        delete_from_friend_list.meta.invitations.meta.all_ids.find(
          (id) => id == action.data.room_user_id
        );

      if (find_invite_error_blocked) {
        delete_from_friend_list.meta.invitations.meta.all_ids =
          delete_from_friend_list.meta.invitations.meta.all_ids.filter(
            (id) => id != action.data.room_user_id
          );

        let find_actualy_fetch_invitation =
          delete_from_friend_list.meta.invitations.data.find(
            (id) => id == action.data.room_user_id
          );

        if (find_actualy_fetch_invitation) {
          delete_from_friend_list.meta.invitations.data =
            delete_from_friend_list.meta.invitations.data.filter(
              (user) => user.id != action.data.room_user_id
            );

          delete_from_friend_list.meta.invitations.meta.excluded_ids =
            delete_from_friend_list.meta.invitations.meta.excluded_ids.filter(
              (id) => id != action.data.room_user_id
            );
        }
      }

      return {
        ...state,
        chat_settings: add_message_localy_error_blocked,
        messages: change_flags_last_conversation,
        friends: delete_from_friend_list,
      };

    case WEBSOCKETS_CATCH_UNBLOCKED_STATUS:
      let change_flags_chat_unblocked = [...state.chat_settings];
      let change_flags_last_conversation_unblocked = state.messages;

      // ODBLOKOWANIE USERA Z LISTY CHAT ORAZ PRZYPISANIU MU INFORMACJI ZWROTNEJ NA TEMAT ZABLOKOWANIA NAS PRZEZ TARGETUSER

      let find_room_user_error_unblocked = change_flags_chat_unblocked.find(
        (user) => user.id == action.data.room_user_id
      );

      if (find_room_user_error_unblocked) {
        find_room_user_error_unblocked.block_target_user =
          action.data.block_target_user;
        find_room_user_error_unblocked.blocked_by_target_user =
          action.data.blocked_by_target_user;
      }

      // ZMIANA FLAG DLA USTAWIEŃ OSTATNICH KONWERSACJI JESLI TAKOWĄ MAMY POBRANĄ

      let find_last_conversation_error_unblocked =
        change_flags_last_conversation_unblocked.data.find(
          (user) => user.id == action.data.room_user_id
        );

      if (find_last_conversation_error_unblocked) {
        find_last_conversation_error_unblocked.block_target_user =
          action.data.block_target_user;
        find_last_conversation_error_unblocked.blocked_by_target_user =
          action.data.blocked_by_target_user;
      }

      return {
        ...state,
        chat_settings: change_flags_chat_unblocked,
        messages: change_flags_last_conversation_unblocked,
      };

    case WEBSOCKETS_CATCH_DELETED_USER:
      let chat_deleted_user = [...state.chat_settings];
      let messages_deleted_user = state.messages;
      let friends_deleted_user = state.friends;

      // USUNIECIE Z LISTY OTWARTYCH CHATÓW

      let find_room_user_deleted = chat_deleted_user.find(
        (user) => user.id == action.user
      );

      if (find_room_user_deleted) {
        chat_deleted_user = chat_deleted_user.filter(
          (user) => user.id != action.user
        );
      }

      // USUNIECIE Z LISTY OSTATNICH KONWERSACJI

      let find_last_conversation_user_deleted = messages_deleted_user.data.find(
        (user) => user.id == action.user
      );

      if (find_last_conversation_user_deleted) {
        messages_deleted_user.data = messages_deleted_user.data.filter(
          (user) => user.id != action.user
        );

        messages_deleted_user.meta.excluded_ids =
          messages_deleted_user.meta.excluded_ids.filter(
            (excluded_id) => excluded_id != action.user
          );
      }

      // USUNIECIE IKONKI NOWYCH WIADOMOSCI W MOMENCIE JESLI TAKOWE ISTNIEJA

      if (
        messages_deleted_user.meta.new_messages.users.hasOwnProperty(
          action.user
        )
      ) {
        messages_deleted_user.meta.new_messages.count -=
          messages_deleted_user.meta.new_messages.users[action.user];
        delete messages_deleted_user.meta.new_messages.users[action.user];
      }

      // USUNIECIE Z LISTY ZNAJOMYCH

      let find_friend_user_deleted = friends_deleted_user.data.find(
        (user) => user.id == action.user
      );

      if (find_friend_user_deleted) {
        friends_deleted_user.data = friends_deleted_user.data.filter(
          (user) => user.id != action.user
        );

        friends_deleted_user.meta.excluded_ids =
          friends_deleted_user.meta.excluded_ids.filter(
            (excluded_id) => excluded_id != action.user
          );
      }

      // USUNIECIE Z LISTY ZAPROSZEN JESLI NASZ USER NA NIEJ SIE ZNAJDUJE

      let find_invite_error_deleted =
        friends_deleted_user.meta.invitations.meta.all_ids.find(
          (id) => id == action.user
        );

      if (find_invite_error_deleted) {
        friends_deleted_user.meta.invitations.meta.all_ids =
          friends_deleted_user.meta.invitations.meta.all_ids.filter(
            (id) => id != action.user
          );

        let actualy_find_invitation_deleted =
          friends_deleted_user.meta.invitations.data.find(
            (user) => user.id == action.user
          );

        if (actualy_find_invitation_deleted) {
          friends_deleted_user.meta.invitations.data =
            friends_deleted_user.meta.invitations.data.filter(
              (user) => user.id != action.user
            );

          friends_deleted_user.meta.invitations.meta.excluded_ids =
            friends_deleted_user.meta.invitations.meta.excluded_ids.filter(
              (id) => id != action.user
            );
        }
      }

      return {
        ...state,
        handler: {
          success: "",
          error: "Nie znaleziono takiego użytkownika",
          type: "catch_deleted_user",
          code: "2073",
        },
        chat_settings: chat_deleted_user,
        messages: messages_deleted_user,
        friends: friends_deleted_user,
      };

    case WEBSOCKETS_INVITATION_REMOVE:
      let friends_invitation_remove = state.friends;

      friends_invitation_remove.meta.invitations.meta.all_ids =
        friends_invitation_remove.meta.invitations.meta.all_ids.filter(
          (id) => id != action.target_user
        );

      let find_invitation =
        friends_invitation_remove.meta.invitations.data.find(
          (invitation) => invitation.id == action.target_user
        );

      if (find_invitation) {
        friends_invitation_remove.meta.invitations.data =
          friends_invitation_remove.meta.invitations.data.filter(
            (invitation) => invitation.id != action.target_user
          );
        friends_invitation_remove.meta.invitations.meta.excluded_ids =
          friends_invitation_remove.meta.invitations.meta.excluded_ids.filter(
            (excluded_id) => excluded_id != action.target_user
          );
      }

      return {
        ...state,
        friends: friends_invitation_remove,
      };

    case WEBSOCKETS_GET_INVITE_SUCCESS:
      let friends_get_invite = state.friends;

      let find_exact_old_invitation =
        friends_get_invite.meta.invitations.data.find(
          (user) => user.id == action.data.user.id
        );

      if (find_exact_old_invitation) {
        friends_get_invite.meta.invitations.data =
          friends_get_invite.meta.invitations.data.filter(
            (user) => user.id != action.data.user.id
          );
        friends_get_invite.meta.invitations.meta.excluded_ids =
          friends_get_invite.meta.invitations.meta.excluded_ids.filter(
            (exclude_id) => exclude_id != action.data.user.id
          );
      } else {
        friends_get_invite.meta.invitations.meta.all_ids = [
          action.data.user.id,
          ...friends_get_invite.meta.invitations.meta.all_ids,
        ];
      }
      friends_get_invite.meta.invitations.data = [
        { ...action.data.user, is_friend: false },
        ...friends_get_invite.meta.invitations.data,
      ];

      friends_get_invite.meta.invitations.meta.excluded_ids = [
        action.data.user.id,
        ...friends_get_invite.meta.invitations.meta.excluded_ids,
      ];

      // PRZYPADEK GDY BĘDĄC USER1, NASZ ZNAJOMY USER2 USUWA NAS ZE ZNAJOMYCH I ZARAZ NAS ZAPRASZA, MUSI BYC PRZYPADEK KTORY W MOMENCIE WYSTEPOWANIA NASZEGO STAREGO USERA2 JAKO ZNAJOMYCH, TRZEBA GO USUNĄĆ

      friends_get_invite.data = friends_get_invite.data.filter(
        (user) => user.id != action.data.user.id
      );

      friends_get_invite.meta.excluded_ids =
        friends_get_invite.meta.excluded_ids.filter(
          (excluded_id) => excluded_id != action.data.user.id
        );

      return {
        ...state,
        friends: friends_get_invite,
      };

    case WEBSOCKETS_FIND_USER_BY_ID_SUCCESS:
      let chat_change_data_user = state.chat_settings;
      let messages_change_data_user = state.messages;
      let friends_change_data_user = state.friends;

      let find_chat_change_data_user = chat_change_data_user.find(
        (user) => user.id == action.data.id
      );

      if (find_chat_change_data_user) {
        find_chat_change_data_user.username = action.data.username;
        find_chat_change_data_user.image_thumbnail =
          action.data.image_thumbnail;
      }

      let find_messages_change_data_user = messages_change_data_user.data.find(
        (user) => user.id == action.data.id
      );

      if (find_messages_change_data_user) {
        find_messages_change_data_user.username = action.data.username;
        find_messages_change_data_user.image_thumbnail =
          action.data.image_thumbnail;
      }

      let find_friends_change_data_user = friends_change_data_user.data.find(
        (user) => user.id == action.data.id
      );

      if (find_friends_change_data_user) {
        find_friends_change_data_user.username = action.data.username;
        find_friends_change_data_user.image_thumbnail =
          action.data.image_thumbnail;
      }

      let find_invitations_change_data_user =
        friends_change_data_user.meta.invitations.data.find(
          (user) => user.id == action.data.id
        );

      if (find_invitations_change_data_user) {
        find_invitations_change_data_user.username = action.data.username;
        find_invitations_change_data_user.image_thumbnail =
          action.data.image_thumbnail;
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "find_user_changed_data",
          code: action.code,
        },
        chat_settings: chat_change_data_user,
        messages: messages_change_data_user,
        friends: friends_change_data_user,
      };

    case WEBSOCKETS_FIND_USER_BY_ID_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "find_user_changed_data",
          code: action.code,
        },
      };

    case WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_SUCCESS:
      let update_invitations_ids = state.friends;
      let update_new_messages_ids = state.messages;

      update_invitations_ids.meta.invitations.meta.all_ids =
        action.data.invitations.all_ids;

      update_new_messages_ids.meta.new_messages = action.data.new_messages;

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "find_user_changed_data",
          code: action.code,
        },
        messages: update_new_messages_ids,
        friends: update_invitations_ids,
      };

    case WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "refresh_invitations_messages_ids",
          code: action.code,
        },
      };

    case WEBSOCKETS_INVITATIONS_LIST_NEXT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "invitations_list_next",
          code: action.code,
        },
        friends: {
          ...state.friends,
          meta: {
            ...state.friends.meta,
            invitations: {
              data: [...state.friends.meta.invitations.data, ...action.data],
              meta: {
                ...state.friends.meta.invitations.meta,
                excluded_ids: [
                  ...state.friends.meta.invitations.meta.excluded_ids,
                  ...action.meta.excluded_ids,
                ],
                end_pagination: action.meta.end_pagination,
              },
            },
          },
        },
      };

    case WEBSOCKETS_INVITATIONS_LIST_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "invitations_list_next",
          code: action.code,
        },
      };

    case WEBSOCKETS_NOTIFICATIONS_LIST_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "notifications_list",
          code: action.code,
        },
        notifications: {
          data: action.data,
          meta: action.meta,
        },
      };

    case WEBSOCKETS_NOTIFICATIONS_LIST_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "notifications_list",
          code: action.code,
        },
      };

    case WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "notifications_list_next",
          code: action.code,
        },
        notifications: {
          data: [...state.notifications.data, ...action.data],
          meta: {
            ...state.notifications.meta,
            cursor_date: action.meta.cursor_date,
            end_pagination: action.meta.end_pagination,
          },
        },
      };

    case WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "notifications_list_next",
          code: action.code,
        },
      };

    case WEBSOCKETS_GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "get_notification",
          code: action.code,
        },
        notifications: {
          data:
            state.notifications?.data !== undefined
              ? [action.data.notification, ...state.notifications.data]
              : [action.data.notification],
          meta: {
            ...state.notifications.meta,
            new_count: state.notifications.meta.new_count + 1,
          },
        },
      };

    case WEBSOCKETS_SEEN_NOTIFICATIONS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "seen_notifications_fail",
          code: action.code,
        },
      };

    case WEBSOCKETS_CLEAR_REDUCER:
      return { ...initialState };

    default:
      return state;
  }
};

export default websocketsReducer;
