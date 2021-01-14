describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });
  it('should clear inputs on submitServerInfo()', () => {
    submitServerInfo();
    expect(serverNameInput.value).toEqual('');
  })
  it('should show added server and earnings in table on updateServerTable()', () => {
    submitServerInfo()
    let tableRow = document.getElementById('server1')

    expect(tableRow.tagName).toEqual('TR')
    expect(tableRow.children[0].textContent).toEqual('Alice')
    expect(tableRow.children[1].textContent).toEqual('$0.00')
  })

  afterEach(function() {
    serverId = 0;
    allServers = {}
    serverTbody.innerHTML = ''
  });
});
