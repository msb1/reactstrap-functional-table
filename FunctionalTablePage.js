import Page from 'components/Page';
import React, { Component } from 'react';
import { MdAddBox, MdDeleteForever, MdRefresh } from 'react-icons/md';
import {
  Card,
  Col,
  Row,
  Button,
  Table,
  Input
} from 'reactstrap';

var defaultWidget = { select: false, id: 0, name: 'newWidget', maxVal: '1', minVal: '0', alarmUL: '1', alarmLL: '0', warnUL: '1', warnLL: '0' }

var widgetData = [
  { select: false, id: 1, name: 'Widget0', maxVal: 100, minVal: 0, alarmUL: 100, alarmLL: 0, warnUL: 100, warnLL: 0 },
  { select: false, id: 2, name: 'Widget1', maxVal: 200, minVal: 0, alarmUL: 200, alarmLL: 0, warnUL: 200, warnLL: 0 },
  { select: false, id: 3, name: 'Widget2', maxVal: 300, minVal: 0, alarmUL: 300, alarmLL: 0, warnUL: 300, warnLL: 0 },
  { select: false, id: 4, name: 'Widget3', maxVal: 400, minVal: 0, alarmUL: 400, alarmLL: 0, warnUL: 400, warnLL: 0 },
  { select: false, id: 5, name: 'Widget4', maxVal: 500, minVal: 0, alarmUL: 500, alarmLL: 0, warnUL: 500, warnLL: 0 },
  { select: false, id: 6, name: 'Widget5', maxVal: 10, minVal: 0, alarmUL: 10, alarmLL: 0, warnUL: 10, warnLL: 0 },
  { select: false, id: 7, name: 'Widget6', maxVal: 20, minVal: 0, alarmUL: 20, alarmLL: 0, warnUL: 20, warnLL: 0 },
  { select: false, id: 8, name: 'Widget7', maxVal: 30, minVal: 0, alarmUL: 30, alarmLL: 0, warnUL: 30, warnLL: 0 },
  { select: false, id: 9, name: 'Widget8', maxVal: 40, minVal: 0, alarmUL: 40, alarmLL: 0, warnUL: 40, warnLL: 0 },
  { select: false, id: 10, name: 'Widget9', maxVal: 50, minVal: 0, alarmUL: 50, alarmLL: 0, warnUL: 50, warnLL: 0 },
];

const widgetCols = [
  { header: '', name: 'select', style: { verticalAlign: 'top', width: '3em' } },
  { header: 'Id', name: 'id', style: { textAlign: 'center', verticalAlign: 'middle', width: '3em', color: '#6a82fb' } },
  { header: 'Name', name: 'name', style: { textAlign: 'center', verticalAlign: 'middle', width: '10em', color: '#6a82fb' } },
  { header: 'Min', name: 'minVal', style: { textAlign: 'center', verticalAlign: 'middle', width: '15em', color: '#6a82fb' } },
  { header: 'Max', name: 'maxVal', style: { textAlign: 'center', verticalAlign: 'middle', width: '15em', color: '#6a82fb' } },
  { header: 'Alarm LL', name: 'alarmLL', style: { textAlign: 'center', verticalAlign: 'middle', width: '15em', color: '#6a82fb' } },
  { header: 'Alarm UL', name: 'alarmUL', style: { textAlign: 'center', verticalAlign: 'middle', width: '15em', color: '#6a82fb' } },
  { header: 'Warn LL', name: 'warnLL', style: { textAlign: 'center', verticalAlign: 'middle', width: '15em', color: '#6a82fb' } },
  { header: 'Warn UL', name: 'warnUL', style: { textAlign: 'center', verticalAlign: 'middle', width: '15em', color: '#6a82fb' } }
];


class FunctionalTablePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      widgets: widgetData,
      widgetColumns: widgetCols,
    }
  }

  onInsertWidgetRow = () => {
    var lastWidgetId = 0;
    if (this.state.widgets.length > 0) {
      lastWidgetId = this.state.widgets[this.state.widgets.length - 1].id;
    }
    var newWidget = JSON.parse(JSON.stringify(defaultWidget));
    newWidget.id = lastWidgetId + 1;
    let data = this.state.widgets;
    data.push(newWidget);
    // can add REST call here to insert new record 
    this.setState({ widgets: data })
  }

  onDeleteWidgetRow = () => {
    var data = this.state.widgets;
    for (var i = data.length - 1; i >= 0; i--) {
      if (data[i].select) {
        data.splice(i, 1);
      }
    }
    this.setState({ widgets: data });
    document.getElementById('selectAll').indeterminate = false;
    document.getElementById('selectAll').checked = false;
  }

  // refreshes widget id's so they start at 1 and are consecutive 
  onRefreshWidgetId = () => {
    var data = this.state.widgets;
    for (var idx = 0; idx < this.state.widgets.length; idx++) {
      data[idx].id = idx + 1;
    }
    this.setState({ widgets: data })
  }

  // select all widgets
  onSelectAllWidgets = () => {
    var selectAllFlag = false;
    if (document.getElementById('selectAll').checked) {
      selectAllFlag = true;
    }
    var data = this.state.widgets;
    data.forEach((d) => d.select = selectAllFlag);
    this.setState({ widgets: data });
  }

  // changes widget state from contentEditable changes in Table
  onWidgetChange = (id, colName, e) => {
    // find row index from record id
    var rowIndex;
    for (var i = 0; i < this.state.widgets.length; i++) {
      if (this.state.widgets[i].id === parseInt(id)) {
        rowIndex = i;
        break;
      }
    }
    var data = this.state.widgets;
    // update appropriate parameter
    if (colName === 'select') {
      data[rowIndex].select = !data[rowIndex].select;
    } else if (colName === 'name') {
      if (data[rowIndex][colName] === e.currentTarget.textContent) {
        return;
      }
      data[rowIndex][colName] = e.currentTarget.textContent;
    } else {
      if (e.currentTarget.textContent === '' || data[rowIndex][colName] === parseFloat(e.currentTarget.textContent)) {
        return;
      }
      let val = parseFloat(e.currentTarget.textContent)
      data[rowIndex][colName] = val;
    }
    // determine selectAll property
    var ctr = 0;
    data.forEach((d) => {
      if (d.select) ctr ++;
    })
    document.getElementById('selectAll').indeterminate = false;
    if (ctr === data.length) {
      document.getElementById('selectAll').checked = true;
    } else if (ctr > 0) {
      document.getElementById('selectAll').indeterminate = true;
    } else {
      document.getElementById('selectAll').checked = false;
    }
    // add REST call here to update table cell changes
    this.setState({ widgets: data });
  }

  // prevents new line from being added to table cell during edit
  preventNewLine = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
    }
  }

  render() {

    return (
      <Page title="Data Config" breadcrumbs={[{ name: 'DataConfig', active: true }]}>

        <Row style={{ marginTop: '3em' }}>
          <Col md={1} sm={1} xs={1} className="mb-3"></Col>
          <Col md={10} sm={10} xs={10} className="mb-3">
            <h3 style={{ color: '#6a82fb', fontWeight: 600 }}>Widget Configuration</h3>
            <Button color='primary' size='sm' onClick={this.onInsertWidgetRow} ><MdAddBox />&nbsp; Insert</Button>
            <Button color='info' size='sm' onClick={this.onRefreshWidgetId} ><MdRefresh />&nbsp; Reset</Button>
            <Button color='danger' size='sm' onClick={this.onDeleteWidgetRow} ><MdDeleteForever />&nbsp; Delete</Button>
          </Col>
          <Col md={1} sm={1} xs={1} className="mb-3"></Col>
        </Row>

        <Row>
          <Col md={1} sm={1} xs={1} className="mb-3"></Col>
          <Col md={10} sm={10} xs={10} className="mb-3">
            <Card className="flex-row">
              <Table bordered id='widgetTable'>
                <thead>
                  <tr>
                    {/* map column dictionary to table column headers */}
                    {this.state.widgetColumns.map(col =>
                      col.name === 'select' ?
                        <th key={col.name} style={col.style}>
                          <Input type='checkbox' id='selectAll'
                            style={{ margin: 'auto', marginTop: '0.35em' }}
                            onClick={this.onSelectAllWidgets}
                          />
                        </th> :
                        <th key={col.name} style={col.style}>{col.header}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* map widgets to table row columns */}
                  {/* First column 'select' is set to input type=checkbox */}
                  {/* Other columns except 'id' column is set to contentEditable=true */}
                  {this.state.widgets.map(row =>
                    <tr key={row.id}>
                      {this.state.widgetColumns.map(col =>
                        col.name === 'select' ?
                          <td key={col.name} >
                            <Input type='checkbox'
                              style={{ margin: 'auto', marginTop: '0.35em' }}
                              onChange={(evt) => this.onWidgetChange(row.id, col.name, evt)}
                              checked={row[col.name]}
                            />
                          </td> :
                          <td key={col.name}
                            style={{ textAlign: 'center' }}
                            contentEditable={col.name !== 'id' ? true : false}
                            suppressContentEditableWarning={true}
                            onKeyDown={this.preventNewLine}
                            onBlur={(evt) => this.onWidgetChange(row.id, col.name, evt)}
                          >
                            {row[col.name]}
                          </td>
                      )}
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col md={1} sm={1} xs={1} className="mb-3"></Col>
        </Row>
      </Page>
    )
  }

}

export default FunctionalTablePage;

