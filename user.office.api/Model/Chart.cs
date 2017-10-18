using System.Collections.Generic;

namespace user.office.api.Model
{
    public class ChartItem {
        public string Label { get; set; }
        public List<DataItem> Data { get; set; }
    }
    public class DataItem {
        public long Date { get; set; }
        public double Value { get; set; }
    }
   
}
