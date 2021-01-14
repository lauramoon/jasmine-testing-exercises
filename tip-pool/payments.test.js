describe("Payments tests (with setup and tear-down)", function() {
    beforeEach(function () {
      billAmtInput.value = 20;
      tipAmtInput.value = 5;
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment' + paymentId].billAmt).toEqual('20');
      expect(allPayments['payment' + paymentId].tipAmt).toEqual('5');
      expect(allPayments['payment' + paymentId].tipPercent).toEqual(25);
    });
    it('should clear all inputs on submitPaymentInfo()', () => {
        submitPaymentInfo();

        expect(billAmtInput.value).toEqual('');
        expect(tipAmtInput.value).toEqual('');
    });
    it('should create current payment object on createCurPayment()', () => {
        let testPayment = createCurPayment();
        expect(testPayment.billAmt).toEqual('20');
        expect(testPayment.tipAmt).toEqual('5');
        expect(testPayment.tipPercent).toEqual(25);
        expect(Object.keys(testPayment).length).toEqual(3);
        tipAmtInput.value = '0';
        expect(createCurPayment().tipAmt).toEqual('0');
        expect(createCurPayment().tipPercent).toEqual(0);
    })
    it('should return nothing from createCurPayment on invalid inputs', () => {
        billAmtInput.value = ''
        expect(createCurPayment()).toBeUndefined();
        billAmtInput.value = '40';
        tipAmtInput.value = '';
        expect(createCurPayment()).toBeUndefined();
        tipAmtInput.value = '-5';
        expect(createCurPayment()).toBeUndefined();
        tipAmtInput.value = '5';
        billAmtInput.value = 0;
        expect(createCurPayment()).toBeUndefined();
    })
    it('should append new table row on appendPaymentTable()', () => {
        paymentId = 3;
        appendPaymentTable(createCurPayment());
        expect(paymentTbody.lastChild.tagName).toEqual('TR');
        expect(paymentTbody.lastChild.id).toEqual('payment3');
        expect(paymentTbody.lastChild.children[0].textContent).toEqual('$20');
        expect(paymentTbody.lastChild.children[1].textContent).toEqual('$5');
        expect(paymentTbody.lastChild.children[2].textContent).toEqual('25%');
    })
    it('should update summary on updateSummary()', () => {
        submitPaymentInfo();
        expect(summaryTds[0].textContent).toEqual('$20');
        expect(summaryTds[1].textContent).toEqual('$5');
        expect(summaryTds[2].textContent).toEqual('25%');
        billAmtInput.value = 50;
        tipAmtInput.value = 7.50;
        submitPaymentInfo();
        expect(summaryTds[0].textContent).toEqual('$70');
        expect(summaryTds[1].textContent).toEqual('$12.5');
        expect(summaryTds[2].textContent).toEqual('20%');
    })

  
    afterEach(function() {
      paymentId = 0;
      allPayments = {}
      paymentTbody.innerHTML = ''
      for (td of summaryTds) {
          td.innerHTML = ''
      }
      billAmtInput.value = ''
      tipAmtInput.value = ''
    });
  });