using DeviceAuth.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DeviceAuth.Models
{
    public static class DevicePersistanceStorage
    {
        public static ConcurrentDictionary<string, Device> DeviceHolder = new ConcurrentDictionary<string, Device>();
    }
}