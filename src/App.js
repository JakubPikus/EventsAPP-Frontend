import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Start from "./pages/auth/Start";
import SessionAuth from "./components/SessionAuth";
import AccountConfirmation from "./pages/auth/AccountConfirmation";
import PasswordReset from "./pages/auth/PasswordReset";
import EventsFindPage from "./pages/start/EventsFindPage";
import EventPage from "./pages/start/EventPage";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProviderEventsFindPage from "./providers/ProviderEventsFindPage";
import ProviderEvent from "./providers/ProviderEvent";
import ProviderUser from "./providers/ProviderUser";
import ProviderNewEvent from "./providers/ProviderNewEvent";
import UserPage from "./pages/start/UserPage";
import NewEventPage from "./pages/start/NewEventPage";
import HomePage from "./components/HomePage";
import ProviderEditEvent from "./providers/ProviderEditEvent";
import EditEventPage from "./pages/start/EditEventPage";
import ProviderSeries from "./providers/ProviderSeries";
import SeriesPage from "./pages/start/SeriesPage";
import ProviderCalendar from "./providers/ProviderCalendar";
import CalendarPage from "./pages/start/CalendarPage";
import ProviderEventsRandomPage from "./providers/ProviderEventsRandomPage";
import EventsRandomPage from "./pages/start/EventsRandomPage";
import ProviderMapPage from "./providers/ProviderMapPage";
import MapPage from "./pages/start/MapPage";
import ProviderFindFriendsPage from "./providers/ProviderFindFriendsPage";
import FindFriendsPage from "./pages/start/FindFriendsPage";
import ProviderEventsBadgesPage from "./providers/ProviderEventsBadgesPage";
import EventsBadgesPage from "./pages/start/EventsBadgesPage";
import ProviderActivateBadgesPage from "./providers/ProviderActivateBadgesPage";
import ActivateBadgesPage from "./pages/start/ActivateBadgesPage";
import ProviderSettingsPage from "./providers/ProviderSettingsPage";
import SettingsPage from "./pages/start/SettingsPage";
import ProviderDashboardPage from "./providers/ProviderDashboardPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProviderMyTicketsPage from "./providers/ProviderMyTicketsPage";
import MyTicketsPage from "./pages/start/MyTicketsPage";
import ProviderEventTicketsPage from "./providers/ProviderEventTicketsPage";
import EventTicketsPage from "./pages/start/EventTicketsPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SessionAuth>
          <Routes>
            <Route path="/" element={<Start />}></Route>

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <ProviderDashboardPage>
                    <DashboardPage />
                  </ProviderDashboardPage>
                </ProtectedAdminRoute>
              }
            ></Route>

            <Route
              path="/events_list"
              element={
                <ProtectedRoute>
                  <ProviderEventsFindPage>
                    <EventsFindPage />
                  </ProviderEventsFindPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/my_tickets"
              element={
                <ProtectedRoute>
                  <ProviderMyTicketsPage>
                    <MyTicketsPage />
                  </ProviderMyTicketsPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <ProviderSettingsPage>
                    <SettingsPage />
                  </ProviderSettingsPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/activate_badges"
              element={
                <ProtectedRoute>
                  <ProviderActivateBadgesPage>
                    <ActivateBadgesPage />
                  </ProviderActivateBadgesPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/create_badges"
              element={
                <ProtectedRoute>
                  <ProviderEventsBadgesPage>
                    <EventsBadgesPage />
                  </ProviderEventsBadgesPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/find_friends"
              element={
                <ProtectedRoute>
                  <ProviderFindFriendsPage>
                    <FindFriendsPage />
                  </ProviderFindFriendsPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <ProviderMapPage>
                    <MapPage />
                  </ProviderMapPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/events_random"
              element={
                <ProtectedRoute>
                  <ProviderEventsRandomPage>
                    <EventsRandomPage />
                  </ProviderEventsRandomPage>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/event/:slug_uuid"
              element={
                <ProtectedRoute>
                  <ProviderEvent>
                    <EventPage />
                  </ProviderEvent>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/tickets/:slug_uuid"
              element={
                <ProtectedRoute>
                  <ProviderEventTicketsPage>
                    <EventTicketsPage />
                  </ProviderEventTicketsPage>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/edit/:slug_uuid"
              element={
                <ProtectedRoute>
                  <ProviderEditEvent>
                    <EditEventPage />
                  </ProviderEditEvent>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/new_event"
              element={
                <ProtectedRoute>
                  <ProviderNewEvent>
                    <NewEventPage />
                  </ProviderNewEvent>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/series"
              element={
                <ProtectedRoute>
                  <ProviderSeries>
                    <SeriesPage />
                  </ProviderSeries>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <ProviderCalendar>
                    <CalendarPage />
                  </ProviderCalendar>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/user/:username"
              element={
                <ProtectedRoute>
                  <ProviderUser>
                    <UserPage />
                  </ProviderUser>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <HomePage>
                  <Login />
                </HomePage>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <HomePage>
                  <Register />
                </HomePage>
              }
            ></Route>
            <Route
              path="/password_reset"
              element={
                <HomePage>
                  <PasswordReset />
                </HomePage>
              }
            ></Route>
          </Routes>
        </SessionAuth>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
