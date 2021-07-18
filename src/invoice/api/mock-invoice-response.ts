export const mockInvoices = {
  items: [
    {
      id: 1,
      type: 'INVOICE_CREATED',
      content: {
        invoiceId: '97f0821d-3517-471a-95f2-f00da84ec56e',
        invoiceNumber: 'INV-001',
        lineItems: [
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'sldkgj sdlkgj lsdkgj',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'sldkjg lsdkgj sdlkgj sld',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'dglksdjg slkdgj sldkg jsldkgj sdlkgj sldkg jsdlkg',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
        ],
        status: 'DRAFT',
        dueDateUtc: '2020-04-30T10:00:00.000Z',
        createdDateUtc: '2020-04-19T10:00:00.000Z',
        updatedDateUtc: '2020-04-19T10:00:00.000Z',
      },
      createdDateUtc: '2020-04-19T10:00:00.000Z',
    },
    {
      id: 2,
      type: 'INVOICE_CREATED',
      content: {
        invoiceId: '97f0821d-3517-471a-95f2-235236236326',
        invoiceNumber: 'INV-001',
        lineItems: [
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
        ],
        status: 'DRAFT',
        dueDateUtc: '2020-04-30T10:00:00.000Z',
        createdDateUtc: '2020-04-19T10:00:00.000Z',
        updatedDateUtc: '2020-04-19T10:00:00.000Z',
      },
      createdDateUtc: '2020-04-19T10:00:00.000Z',
    },
    {
      id: 3,
      type: 'INVOICE_CREATED',
      content: {
        invoiceId: '97f0821d-3517-471a-95f2-sdhgewtywywe',
        lineItems: [
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
          },
        ],
      },
      createdDateUtc: '2020-04-19T10:00:00.000Z',
    },
  ],
};

export const mockInvoiceFeedUpdate = {
  items: [
    {
      id: 4,
      type: 'INVOICE_DELETED',
      content: {
        invoiceId: '97f0821d-3517-471a-95f2-f00da84ec56e',
      },
      createdDateUtc: '2020-04-19T10:00:00.000Z',
    },
    {
      id: 5,
      type: 'INVOICE_UPDATED',
      content: {
        invoiceId: '97f0821d-3517-471a-95f2-235236236326',
        invoiceNumber: 'INV-001',
        lineItems: [
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'new Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'more Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
        ],
        status: 'SENT',
        dueDateUtc: '2020-04-30T10:00:00.000Z',
        createdDateUtc: '2020-04-19T10:00:00.000Z',
        updatedDateUtc: '2020-04-19T10:00:00.000Z',
      },
      createdDateUtc: '2020-04-19T10:00:00.000Z',
    },
    {
      id: 6,
      type: 'INVOICE_DELETED',
      content: {
        invoiceId: '97f0821d-3517-471a-95f2-sdhgewtywywe',
      },
      createdDateUtc: '2020-04-19T10:00:00.000Z',
    },
    {
      id: 7,
      type: 'INVOICE_CREATED',
      content: {
        invoiceId: '97f0821d-3517-471a-95f2-sdhsdhdshs',
        invoiceNumber: 'INV-001',
        lineItems: [
          {
            lineItemId: '2686350b-2656-48a0-912d-763c06ef5c04',
            description: 'Supplies',
            quantity: 2,
            unitCost: 10.15,
            lineItemTotalCost: 20.3,
          },
        ],
        status: 'DRAFT',
        dueDateUtc: '2020-04-30T10:00:00.000Z',
        createdDateUtc: '2020-04-19T10:00:00.000Z',
        updatedDateUtc: '2020-04-19T10:00:00.000Z',
      },
      createdDateUtc: '2020-04-19T10:00:00.000Z',
    },
  ],
};
