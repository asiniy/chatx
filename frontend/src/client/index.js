const store = createStore(pages);

const wrappedApp = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="sign_in" component={SignIn} />
        <Route path="/chat" component={Chat} />
      </Route>
    </Router>,
  </Provider>
)

ReactDOM.render(

  document.getElementById('root'),
);
