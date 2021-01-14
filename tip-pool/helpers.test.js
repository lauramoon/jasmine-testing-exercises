describe('helpers tests', () => {
    it('should sum the specified payment amounts in allPayments on sumPaymentTotal()', () => {
        billAmtInput.value = 20;
        tipAmtInput.value = 5;
        allPayments['payment1'] = createCurPayment();
        billAmtInput.value = 40;
        tipAmtInput.value = 6;
        allPayments['payment2'] = createCurPayment();
        expect(sumPaymentTotal('billAmt')).toEqual(60);
        expect(sumPaymentTotal('tipAmt')).toEqual(11);
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
    })
    it('should calculate the percentage on calculateTipPercentage()', () => {
        expect(calculateTipPercent(20, 4)).toEqual(20);
        expect(calculateTipPercent(32, 4)).toEqual(13);
        expect(calculateTipPercent(50, 15)).toEqual(30);
    })
    it('should add new table element to provided row on appendTD()', () => {
        let tableRow = document.createElement('tr');
        appendTd(tableRow, 'element text');
        expect(tableRow.firstChild.tagName).toEqual('TD');
        expect(tableRow.children.length).toEqual(1);
        expect(tableRow.firstChild.textContent).toEqual('element text');
        tableRow.remove();
    })
    it('should append X to end of table row on appendDeleteBtn()', () => {
        let tableRow = document.createElement('tr');
        appendDeleteBtn(tableRow);
        expect(tableRow.firstChild.tagName).toEqual('TD');
        expect(tableRow.children.length).toEqual(1);
        expect(tableRow.firstChild.textContent).toEqual('X');
        tableRow.remove();
    })

})