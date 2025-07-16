import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {



	public diagram: go.Diagram = null;
  public selectedNode = null;
  public model: go.TreeModel = new go.TreeModel(
    [
      { 'key': 1, 'position': 'Talent Position', 'level' : 0, 'members_required' : 0 },
    ]
  );

  @Output()
  public nodeClicked = new EventEmitter();

  @Output() 
  public nameEmitter = new EventEmitter(); 
  
  @Output()
  public deleteEmitter = new EventEmitter(); 

  constructor() { }

  public ngAfterViewInit() {

    this.diagram = $(go.Diagram, 'myDiagramDiv',
      {
      	maxSelectionCount: 1, // users can select only one part at a time
            validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
            "clickCreatingTool.archetypeNodeData": { // allow double-click in background to create a new node
              position: "(new person)",
              level: "0",
              members_required : "0"
            },
      	"clickCreatingTool.insertPart": function(loc) {  // scroll to the new node
              var node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
              if (node !== null) {
                this.diagram.select(node);
                this.diagram.commandHandler.scrollToPart(node);
                this.diagram.commandHandler.editTextBlock(node.findObject("NAMETB"));
              }
              return node;
            },
        layout:
          $(go.TreeLayout,
            {
              isOngoing: true,
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 20
            }),
        'undoManager.isEnabled': true
      }
    );   

    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        // for sorting, have the Node.text be the data.name
        new go.Binding('text', 'name'),
        { doubleClick: function(e,obj){
          console.log(obj.diagram);
          
          // var clicked = obj.part;
          var clicked = obj.part;
           if (clicked !== null) {
              var thisemp = clicked.data;
             
              
              obj.diagram.startTransaction("add employee");
              var newemp = {
                position: "Talent Position",
                level: "0",
                members_required : "0",
                parent: thisemp.key
              };
              obj.diagram.model.addNodeData(newemp);
              obj.diagram.commitTransaction("add employee");
           }
        } },
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding('layerName', 'isSelected', function(sel) { return sel ? 'Foreground' : ''; }).ofObject(),
        // define the node's outer shape
        $(go.Shape, 'Rectangle',
          {
            name: 'SHAPE', fill: 'lightblue', stroke: null,
            // set the port properties:
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
          },
          new go.Binding('fill', '', function(node) {
            // modify the fill based on the tree depth level
            const levelColors = ['#848484', '#848484', '#848484', '#848484',
              '#848484', '#848484', '#848484', '#848484'];
            let color = node.findObject('SHAPE').fill;
            const dia: go.Diagram = node.diagram;
            if (dia && dia.layout.network) {
              dia.layout.network.vertexes.each(function(v: go.TreeVertex) {
                if (v.node && v.node.key === node.data.key) {
                  const level: number = v.level % (levelColors.length);
                  color = levelColors[level];
                }
              });
            }
            return color;
          }).ofObject()
        ),
        $(go.Panel, 'Horizontal',
        
          // define the panel where the text will appear
          $(go.Panel, 'Table',
            {
              maxSize: new go.Size(150, 999),
              margin: new go.Margin(6, 10, 0, 3),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),

            // Talent Position
            $(go.TextBlock, { font: '9pt Segoe UI,sans-serif', stroke: 'white' },  // the name
              {
                row: 0, column: 0, columnSpan: 5,
                font: '12pt Segoe UI,sans-serif',
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 16)
              },
              new go.Binding('text', 'position').makeTwoWay()),



              // Talent Level
            $(go.TextBlock, 'Level: ', { font: '9pt Segoe UI,sans-serif ', stroke: 'white' },
              { row: 1, column: 0 }),
            $(go.TextBlock, { font: '9pt Segoe UI,sans-serif', stroke: 'black', background: "white" },
              {
                row: 1, column: 1, columnSpan: 4,
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 14),
                margin: new go.Margin(0, 0, 0, 3)
              },
              new go.Binding('text', 'level').makeTwoWay()),

              

            // Members Required
            $(go.TextBlock, 'Member Required: ', { font: '9pt Segoe UI,sans-serif', stroke: 'white' },
              { row: 2, column: 0 }),
            $(go.TextBlock, { font: '9pt Segoe UI,sans-serif', stroke: 'black', background: "white" },
              {
                row: 2, column: 1, columnSpan: 4,
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 14),
                margin: new go.Margin(0, 0, 0, 3)
              },
              new go.Binding('text', 'members_required').makeTwoWay()),
  
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node

    this.diagram.model = this.model;

    // when the selection changes, emit event to app-component updating the selected node
    this.diagram.addDiagramListener('ChangedSelection', (e) => {
      const node = this.diagram.selection.first();
      this.nodeClicked.emit(node);
      this.nameEmitter.emit(this.model.nodeDataArray); 
    });

    this.diagram.addDiagramListener('SelectionDeleting', (e) => {
      const node = this.diagram.selection.first();      
      this.nodeClicked.emit(node);
      this.deleteEmitter.emit(node.key); 
    });

  }

  public setSelectedNode(node) {
    this.selectedNode = node;
  }

  showData(){
    
    console.log(this.model.nodeDataArray);
    
  }

  getModelData(){
    return this.model.nodeDataArray
  }

}

