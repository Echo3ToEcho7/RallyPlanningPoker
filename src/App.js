var Ext = window.Ext4 || window.Ext;
var Rally = window.Rally;

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
    backlogView: null,
    usersView: null,
    votingView: null,
    cardsView: null,
    
    backlogDS: null,

    launch: function() {
      //Write app code here
      var me = this;
      
      me.on('beforedestroy', function () {
        console.log('Leaving app');
      });
      
      me.on('beforeactive', function () {
        console.log('Entering app');
      });

      Rally.data.ModelFactory.getModel({
        type: 'UserStory',
        success: function(model) {
          me.backlogView = this.add({
            xtype: 'rallygrid',
            model: model,
            columnCfgs: [
                'FormattedID',
                'Name',
                'Release',
                'PlanEstimate'
            ],
            storeConfig: {
              filters: [{
                  property: 'Iteration',
                  operator: '=',
                  value: 'null'
                 }, {
                  property: 'DirectChildrenCount',
                  operator: '=',
                  value: 0
                }
              ],
              sorters: [
                {
                  property: 'Rank',
                  direction: 'DESC'
                }
              ]
            }
          });
        },
        scope: this
      });
    }
});
